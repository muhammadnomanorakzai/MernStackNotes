export const mongodbRelManyToMany = {
  id: "mongodb-rel-many-to-many",
  title: "N:N Relationships — Modeling Many-to-Many",
  category: "MongoDB",
  difficulty: "Advanced",
  tags: ["MongoDB", "Relationships", "Many-to-Many", "Two-way Referencing", "Junction Collection"],

  definition:
    "A Many-to-Many (N:N) relationship exists when multiple documents in one collection are associated with multiple documents in another collection. In MongoDB, these are most often modeled using 'Two-Way Referencing' (arrays of IDs in both documents).",

  simpleExplanation:
    "Imagine Students and Courses. One Student can take many courses, and one Course can have many students. This is a Many-to-Many relationship. In MongoDB, the student's file has a list of 'Course IDs', and the course's file has a list of 'Student IDs'. This allows you to quickly see which students are in a class, or which classes a student is taking.",

  romanUrduRevision:
    "Many-to-Many ($N:N$) mein dono sides par bohot saarey records hotay hain (jaise Students aur unke Courses). MongoDB mein is ke liye hum dono documents mein 'Arrays of IDs' rakhte hain. Isay 'Two-Way Referencing' kehte hain. Agar data bohot massive ho toh hum aik darmiyani 'Link' collection ($Junction Table$ style) bhi bana saktay hain.",

  realLifeExample:
    "E-commerce Categories and Products: A 'T-Shirt' can belong to categories 'Men', 'Clothing', and 'Summer'. At the same time, the 'Men' category contains T-Shirts, Jeans, and Watches. We store an array of category IDs in each product, and an array of product IDs in each category.",

  why: "Query Flexibility. Having IDs on both sides allows for fast two-way lookups. If a student loses their ID card, the school can check the course list to find them. If a course is cancelled, the school can check the student lists to notify everyone. It reduces the number of expensive database scans.",

  how: [
    "Step 1 - Define an array of ObjectIds in both related schemas.",
    "Step 2 - Use the 'ref' property in Mongoose to point to the other model.",
    "Step 3 - When a student joins a course, push the CourseID to student.courses AND studentID to course.students.",
    "Step 4 - Use '.populate()' on either side to fetch all related details.",
    "Step 5 - For massive N:N (e.g., Millions of followers), use a separate 'Relationships' collection.",
  ],

  diagram: `
graph LR
    subgraph Collections [N:N Structure]
        S1["Student: { id: 'S1', courses: ['C1', 'C2'] }"]
        S2["Student: { id: 'S2', courses: ['C1'] }"]
        C1["Course: { id: 'C1', students: ['S1', 'S2'] }"]
        C2["Course: { id: 'C2', students: ['S1'] }"]
        S1 --- C1
        S1 --- C2
        S2 --- C1
    end
  `,

  analogy:
    "It's like 'International Diplomacy'. One Country has relationships with many other countries, and each of those countries has relationships back with many others. Every country keeps a list (Array) of their 'Allies' (IDs).",

  code: `
// --- Student Schema ---
const studentSchema = new Schema({
  name: String,
  courses: [{ type: Schema.Types.ObjectId, ref: 'Course' }]
});

// --- Course Schema ---
const courseSchema = new Schema({
  title: String,
  students: [{ type: Schema.Types.ObjectId, ref: 'Student' }]
});

// --- Querying (Two-Way) ---
// Find all courses for a student
const student = await Student.findById(sId).populate('courses');

// Find all students in a course
const course = await Course.findById(cId).populate('students');
  `,

  commonMistake: [
    "Only referencing on one side. If only the Student knows their Courses, finding all students in a specific Course becomes a very slow collection scan.",
    "Hitting the 16MB limit. If a single 'Course' has 50,000 students, the array of IDs will bloat the document. Use a separate collection (Junction Table style) for massive N:N.",
    "Consistency Bugs: Forgetting to push the ID to the 'other' side during an update, leaving the relationship broken in one direction.",
    "Not handling 'Bulk removal'—if a student is deleted, their ID should be removed from all courses' student arrays (requires careful cleanup logic).",
  ],

  interviewSummary:
    "Many-to-Many is handled via shared ID arrays in MongoDB, known as two-way referencing. For very large datasets that risk hitting document size limits, a third 'junction' collection is used to store individual link documents, mimicking relational database patterns.",

  interviewQA: [
    {
      q: "What is a 'Junction' or 'Link' collection in MongoDB?",
      a: "It is a third collection used to store documents that link two other collections (e.g., each document has { studentID, courseID }). This is used for very large N:N relationships to avoid array size limits.",
    },
    {
      q: "Does MongoDB support SQL-style JOINs for N:N?",
      a: "No native JOINs, but it provides the '$lookup' aggregation operator which can simulate a join between collections.",
    },
  ],
};
