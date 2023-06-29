//Comps/PHome.jsx


export default function PHome() {

  return (
    <div>
      <hr />
      <div style={{ width: "400px" }}>
        <button
          onClick={() => {
            console.log("====================================");
            console.log("lolo");
            console.log("====================================");
          }}
        >
          נוסעים יש כאן טרמפים
        </button>
        <br />
        <hr />
        <br />
        <button
          onClick={() => {
            console.log("====================================");
            console.log("lolo");
            console.log("====================================");
          }}
        >
          נהגים יש כאן טרמפיסטים
        </button>
        <br />
        <hr />
        <br />
        <button
          onClick={() => {
            console.log("====================================");
            console.log("lolo");
            console.log("====================================");
          }}
        >
          הוסף נסיעה או בקש טרמפ
        </button>
      </div>
    </div>
  );
}
