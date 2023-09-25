// Address.js
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchAddresses } from './actions';

const Address = ({ addresses, fetchAddresses }) => {
  useEffect(() => {
    fetchAddresses();
  }, [fetchAddresses]);

  // API'den veri çekildiğinde ve Redux store güncellendiğinde bu bileşen yeniden render edilecektir.

  if (!addresses.length) {
    return <div>Loading...</div>; // Veriler yüklenirken ekranda "Yükleniyor..." mesajını görüntüleyebilirsiniz.
  }

  return (
    <div>
      <h1>Adresler</h1>
      <ul>
        {addresses.map((address) => (
          <li key={address.id}>
            <strong>ID:</strong> {address.id}<br />
            <strong>Sokak:</strong> {address.street}<br />
            <strong>Sehir:</strong> {address.city}<br />
            <strong>Ulke:</strong> {address.country}<br />
            <strong>Adres TURU:</strong> {address.addressType}<br />
            <strong>Adres Aaciklamasi:</strong> {address.addressDescription}<br />
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = (state) => ({
  addresses: state.address.addresses,
});

export default connect(mapStateToProps, { fetchAddresses })(Address);
