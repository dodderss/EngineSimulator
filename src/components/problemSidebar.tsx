import "./problemSidebar.tsx.css";

function ProblemSidebar() {
  return (
    <div className="rightSection fixed right-0 bottom-0 text-3xl">
      <div className="propertiesSection">
        <h1>Properties</h1>
      </div>
      <div className="problemsSection text-3xl">
        <h1>Problems</h1>
      </div>
    </div>
  );
}

export default ProblemSidebar;
