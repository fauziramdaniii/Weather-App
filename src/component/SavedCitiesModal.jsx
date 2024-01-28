// SavedCitiesModal.jsx
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

const SavedCitiesModal = ({ savedCities, onClose, deleteCity }) => {
  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Saved Cities</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <table className="table">
          <thead>
            <tr>
              <th>City</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {savedCities.map(city => (
              <tr key={city}>
                <td>{city}</td>
                <td>
                  <Button variant="danger" size="sm" onClick={() => deleteCity(city)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal.Body>
    </Modal>
  );
};

export default SavedCitiesModal;
