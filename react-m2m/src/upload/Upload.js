import { useState, useEffect } from 'react';
import { API_BASE_URL } from "../misc/config";
import Loading from '../loading/Loading';

export default function Upload({ id }) {

    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // setLoading(true);
        setError(null);
        // setMessage("");

        try {
            const formData = new FormData();
            // formData.append("title", item.title);
            // formData.append("descr", item.descr);
            // formData.append("price", item.price);
            if (file) formData.append("file", file);

            const method = id ? "PUT" : "POST";
            let url = `${API_BASE_URL}upload`;
            url = id ? `${url}/${id}` : url;

            const response = await fetch(url, {
                method,
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);
            }

            const data = await response.json();
            // setMessage(` ${id ? "Updated" : "Created"} successfully!`);
            console.log("Server response:", data);

            // if (onClose) onClose(); // close modal or refresh parent
        } catch (err) {
            setError(err.message);
        }
        setLoading(false);
    };

    return (<div>
        <form onSubmit={handleSubmit}>
            <label className="form-label">Upload</label>
            <input
                type="file"
                className="form-control"
                // accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
            />
            {/* <input type="file" onChange={handleFileChange} /> */}
            <button disabled={!file || loading} type="submit">
                Submit
            </button>

            {error && <p style={{ color: 'red', border: '1px solid red' }}>Error: {error}</p>}
        </form>
    </div>
    );
}