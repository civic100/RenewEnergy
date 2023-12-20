import React, { useEffect, useState } from 'react';
import usePaymentState from './PaymentState';



const PaymentComponent = () => {
    const {
        payment,
        setPayment,
        editPopoverAnchorEl,
        setEditPopoverAnchorEl,
        createPopoverAnchorEl,
        setCreatePopoverAnchorEl,
        editedPayment,
        setEditedPayment,
        clearEditedPayment,
        columns,
        fields
    } = usePaymentState();
    const [updated, setUpdated] = useState(false);

    useEffect(() => {
        const fetchPayment = async () => {
            try {
                const response = await fetch('http://localhost:8080/usersprojects/payment');
                if (!response.ok) {
                    throw new Error('Error al obtener los datos de paneles solares');
                }
                const data = await response.json();
                console.log(data);
                setUpdated(true); // Marcar que la actualización se ha realizado
            } catch (error) {
                console.error('Error:', error);
            }
        };

        if (!updated) {
            fetchPayment(); // Realizar la llamada solo si no se ha actualizado
        }
    }, [payment]);
    return(
        "hola"
    )
}

export default PaymentComponent;