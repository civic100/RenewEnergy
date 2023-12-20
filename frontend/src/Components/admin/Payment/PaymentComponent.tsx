import React, { useEffect, useState } from 'react';
import usePaymentState from './PaymentState';
import DataTable from '../../Global/DataTable.tsx';

const PaymentComponent = () => {
    const {
        payment,
        setPayment,
        columns,
    } = usePaymentState();
    const [updated, setUpdated] = useState(false);

    useEffect(() => {
        const fetchPayment = async () => {
            try {
                const response = await fetch('http://localhost:8080/usersprojects/payment');
                if (!response.ok) {
                    throw new Error('Error al obtener los datos de payment');
                }
                const data = await response.json();
                const transformedData = data.map(item => ({
                    id_user: item[0],
                    id_project: item[1],
                    amount: item[2],
                }));

                setPayment(transformedData);
                setUpdated(true); // Marcar que la actualización se ha realizado
            } catch (error) {
                console.error('Error:', error);
            }
        };

        if (!updated) {
            fetchPayment(); // Realizar la llamada solo si no se ha actualizado
        }
    }, [payment]);
    return (
        <>
            <DataTable columns={columns} data={payment} onEnable={false} onEdit={false} idKey='id_user' />
        </>
    )
}

export default PaymentComponent;