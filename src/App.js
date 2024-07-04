import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";

export default function App() {
  const [students, setStudents] = useState([]);

  function handleAddStudent(newStudent) {
    setStudents((students) => [...students, newStudent]);
  }
  return (
    <div className="App">
      <Header />
      <Form onAddStudent={handleAddStudent} />
      <List students={students} />
    </div>
  );
}

function Header() {
  return (
    <header>
      <h1>Sample</h1>
      <h2>Student Enrollment Form</h2>
    </header>
  );
}

function Form({ onAddStudent }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [image, setImage] = useState("");
  const [gender, setGender] = useState("Male");
  const [skills, setSkills] = useState({
    ReactJs: false,
    NodeJs: false,
    firebase: false,
    MongoDB: false,
    php: false,
    git: false,
  });

  function handleChange(evt) {
    const { name, checked } = evt.target;
    setSkills((prevSkills) => ({ ...prevSkills, [name]: checked }));
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    if (!name || !email || !website || !gender || !Object.values(skills).includes(true)) {
      alert("enter the complete details");
      return;
    }

    const selectedSkills = Object.keys(skills).filter((skill) => skills[skill]);


    const newStudent = {
      id: Date.now(),
      name,
      email,
      website,
      image,
      gender,
      skills: selectedSkills,
    };
    console.log(newStudent);
    // clearing input fields
    onAddStudent(newStudent);
    setName("");
    setEmail("");
    setWebsite("");
    setImage("");
    setGender("");
    setSkills({
      ReactJs: false,
      NodeJs: false,
      firebase: false,
      MongoDB: false,
      php: false,
      git: false,
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <label>Email</label>
        <input
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <label>WebSite</label>
        <input
          type="text"
          placeholder="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        ></input>
        <label>ImageLink</label>
        <input
          type="text"
          placeholder="image link"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        ></input>
        <label>Gender</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <label>Skills</label>
        <div>
          <input
            type="checkbox"
            name="ReactJs"
            checked={skills.ReactJs}
            onChange={handleChange}
          />
          <label>ReactJs</label>

          <input
            type="checkbox"
            name="nodeJs"
            checked={skills.NodeJs}
            onChange={handleChange}
          />
          <label>nodeJs</label>

          <input
            type="checkbox"
            name="firebase"
            checked={skills.firebase}
            onChange={handleChange}
          />
          <label>firebase</label>

          <input
            type="checkbox"
            name="mongoDB"
            checked={skills.MongoDB}
            onChange={handleChange}
          />
          <label>mongoDB</label>

          <input
            type="checkbox"
            name="php"
            checked={skills.php}
            onChange={handleChange}
          />
          <label>php</label>

          <input
            type="checkbox"
            name="git"
            checked={skills.git}
            onChange={handleChange}
          />
          <label>git</label>
        </div>

        <button onClick={handleSubmit}>
          <FontAwesomeIcon icon={faUserPlus} />
          Enroll Student
        </button>
      </form>
      <button
        onClick={() => {
          setName("");
          setEmail("");
          setWebsite("");
          setSkills({
            ReactJs: false,
            NodeJs: false,
            firebase: false,
            MongoDB: false,
            php: false,
            git: false,
          });
          setImage((prevImg) => prevImg);
          setGender("male");
        }}
      >
        <FontAwesomeIcon icon={faTrash} />
        Clear
      </button>
    </>
  );
}
function List({ students }) {
  return (
    <div>
      <ul>
        {students.map((student) => (
          <Student key={student.id} student={student} />
        ))}
      </ul>
    </div>
  );
}

function Student({ student }) {
  return (
    <li style={{ listStyle: "none" }}>
      <div>
        <h3>Description</h3>
        <p>{student.name}</p>
        <p>{student.gender}</p>
        <p>{student.email}</p>
        <p>{student.website}</p>
        <p>{student.skills.join(", ")}</p>
      </div>
      <div>
        <h3>Image</h3>
        <FontAwesomeIcon icon={faUser} />
      </div>
    </li>
  );
}
