import "./SystemPage.css";
function SystemPage(){
    return(
        <div className="container">
            <div
                className="table-responsive"
            >
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Admin ID</th>
                            <th scope="col">Company Name</th>
                            <th scope="col">Email ID</th>
                            <th scope="col">Contact</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                </table>
            </div>
            
        </div>
    );
}
export default {SystemPage};