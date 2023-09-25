// AddressPage.js
import React from 'react';
import { connect } from 'react-redux';

const AddressPage = ({ addresses }) => {
  return (
    <div>
      <h1>Adres Listesi</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Sokak</th>
            <th>Şehir</th>
            <th>Ülke</th>
            <th>Adres Türü</th>
            <th>Adres Açıklaması</th>
          </tr>
        </thead>
        <tbody>
          {addresses.map((address) => (
            <tr key={address.id}>
              <td>{address.id}</td>
              <td>{address.street}</td>
              <td>{address.city}</td>
              <td>{address.country}</td>
              <td>{address.addressType}</td>
              <td>{address.addressDescription}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state) => ({
  addresses: state.address.addresses,
});

export default connect(mapStateToProps)(AddressPage);
