import User from "./components/user";
import Data from "./assets/userData"
import Books from "./components/Books/books";
// import Counter from "./components/Hooks";

const App = () => {
    return (
        <>
            {
                // Data.map((detail) => {
                //      return<User key={detail.id}  name={detail.name} email={detail.email} />
                // })
            }
            {/* <Counter/> */}
            <Books/>
        </>
    )
}
export default App;