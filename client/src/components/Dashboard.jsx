import { Component } from "react"
import './Dashboard.css'
class Dashboard extends Component {
    
    get
    render() {
        return (
            <>
                <h3 className="start">Link Dashboard</h3>

                <main className="mxy-5" style={{
                    "min-height": "0px",
                    "max-height": "500px",
                    "overflow-y": "scroll"
                }} >
                    <ol class="list-group list-group-numbered">

                        <li class="list-group-item d-flex justify-content-between align-items-start">
                            <div class="ms-2 me-auto">
                                <div class="fw-bold">Subheading</div>
                                Content for list item
                            </div>
                            <span class="badge bg-secondary rounded-pill">14</span>
                        </li>

                    </ol>
                </main>
            </>
        );
    }
}

export default Dashboard;
