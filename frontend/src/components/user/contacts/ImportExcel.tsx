import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import * as XLSX from "xlsx";
import axios from 'axios';
import '../user.css';

const ImportExcel = () => {
    // Definitions
    const navigate = useNavigate();
    const [uploadedData, setUploadedData] = useState<any>([]);

    // Functions
    const backToDashboard = () => { 
        navigate('/user/contacts/mycontacts');
    }

    const onFileInput = (input: any) => {
        const reader = new FileReader(); // reads the content of the provided file
        reader.readAsBinaryString(input.target.files[0]); // The first file is passed to the readAsBinaryString method
        reader.onload = (input: any) => { // Code block executed whent the file is laoded successfully
            const data = input.target.result;
            const workbook = XLSX.read(data, {type: "binary"}); // The workbook object represents the Excel file in JavaScript
            const sheetName = workbook.SheetNames[0]; // Take the first sheet
            const sheet = workbook.Sheets[sheetName];
            setUploadedData(XLSX.utils.sheet_to_json(sheet, {defval:""})); // Convert the Excel data into a parsed JSON array and save to state, blank cells are inputted as empty string ""
            setPages(Math.ceil(XLSX.utils.sheet_to_json(sheet).length / perPage)); // To set total number of pages on initial render
        }
    }

    // Pagination
    const [perPage, setPerPage] = useState(10); // Items per page
    const [pages, setPages] = useState(0); // No. of pages in total given, if any, the search selection
    const [currentPage, setCurrentPage] = useState(0); // Current page no.
    const onPageClick = (event: any) => {
        let page = event.selected;
        setCurrentPage(page);
    }
    const paginatedData = uploadedData.slice(currentPage * perPage, (currentPage + 1) * perPage); // We map over this to display every page

    const importContacts = async () => {
        const dataURL = `http://localhost:3001/user/contacts`;
        const token = localStorage.getItem("token");


        // Loop over uploadedData and save details of each item/row to database
        Object.keys(uploadedData).forEach(async function(contact:any) { 
            try {
                const {data} = await axios.request({
                    url: dataURL,
                    method: "post",
                    headers: {
                        "token": `${token}`,
                        },
                    data: {
                        "name" : uploadedData[contact].name,
                        "surname" : uploadedData[contact].surname,
                        "company" : uploadedData[contact].company,
                        "email" : uploadedData[contact].email,
                        "phone" : uploadedData[contact].phone,
                        "contactDate" : uploadedData[contact].contactDate,
                        "job" : uploadedData[contact].job,
                        "role" : uploadedData[contact].role,
                        "city" : uploadedData[contact].city,
                    }
                });
            if (data.status === 1) {
                console.log("New contact added");
            }
            }
            catch (error) {console.log(error);}  
            navigate('/user/contacts/mycontacts'); // Return back to contacts dashboard after contact import
        });
    };

return (
    <>
    <div className="user">
    <div className="container">
        <h1> People Portal </h1>

        <div className="row">
            <div className="d-grid col-5">
                <h2 className="title"> Import contacts from Excel </h2>
                <p>Contacts found: {uploadedData.length}</p>        
            </div>

            <div className="d-grid col-4">
                <h2 className="title"> Upload file </h2>
                <div className="input-group mb-3">
                    <form className="d-flex" role="search">
                        <input 
                            type="file"
                            accept=".xlsx, .xls"
                            onChange={onFileInput}
                            className="form-control" 
                            aria-label="File input"
                            aria-describedby="file-input"/>
                    </form>
                </div>        
            </div>
        </div>

        <div className="row">
            <div className="d-grid col">
                <h2 className="title"> Instructions</h2>
                <p>Please format the first sheet of your workbook to match the table headings below. The first row of your 
                    workbook that contains headings will not be uploaded. After reviewing your data, click on the "Import all 
                    contacts" button to save the contacts in your private database.</p>   
            </div>
        </div>

        <div className="table-responsive">
            <ReactPaginate
            previousLabel={'<'}
            nextLabel={'>'}
            pageCount={pages}
            onPageChange={onPageClick}
            containerClassName={'pagination'}
            activeClassName={'active'}
            />
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Surname</th>
                            <th scope="col">Company</th>
                            <th scope="col">Job title</th>
                            <th scope="col">Role</th>
                            <th scope="col">Email</th>
                            <th scope="col">Phone number</th>
                            <th scope="col">Location</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedData &&
                        paginatedData.map((row: number, index: number) => (
                            <tr key={index}>
                                {Object.values(row).map((value: any, index: number) => (
                                    <td key={index}> {value} </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
      
        </div>

        <div className="row mt-5">
            <div className="d-grid gap-2 col-2">
                <button className="btn btn-outline-primary" type="button" onClick={backToDashboard}>Back to dashboard</button>
            </div>
            <div className="d-grid gap-2 col-2">
                <button className="btn btn-outline-success" type="button" onClick={importContacts}>Import all contacts</button>
            </div>
        </div>

    </div>
    </div>
    </>
)
}

export default ImportExcel;