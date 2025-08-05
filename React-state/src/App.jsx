import User from "./components/user";
import Data from "./assets/userData"

const App = () => {
    return (<>
        {Data.map(detail => {
            return <User key={detail.id} name={detail.age} gender={detail.gender} />
        })}

    </>
    )
}
export default App;