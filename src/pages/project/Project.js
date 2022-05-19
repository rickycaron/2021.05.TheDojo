import { useParams } from "react-router-dom"
import { useDocument } from '../../hooks/useDocument'

import ProjectSummary from "./ProjectSummary"
// styles
import './Project.css'

export default function Project() {
    const { id } = useParams()//get the id of the document from the url
    const { document, error } = useDocument('projects', id)

    if (error) {
        //if there is an error, just return the error and ignore all the contents below
        return <div className="error">{error}</div>
    }
    if (!document) {
        //while the document is not finsihed, return the loading message, when the ducument returns, the below return will run
        return <div className="loading">Loading...</div>
    }

    return (
        <div className="project-details">
            <ProjectSummary project={document} />
        </div>
    )
}
