import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const ConfirmAccount: React.FC = () => {
    const { token } = useParams<{ token: string }>();
    const [confirmedAccount, setConfirmedAccount] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {

        const confirmAccount = async () => {
            try {
                const response = await fetch(`http://localhost:3000/users/confirm/${token}`, {
                    method: 'POST',
                });


                if (!response.ok) {
                    const data = await response.json();
                    toast.error(data || 'Error al confirmar tu cuenta')
                    return;
                }

                setConfirmedAccount(true);
                toast.success('Confirmaste tu cuenta');
                setTimeout(() => {
                    navigate('/login'); 
                }, 3000);

            } catch (error) {
                toast.error(`${error}` || 'Error al confirmar tu cuenta')
                return;
            }
        };

        confirmAccount();
    }, [token, navigate]);


    return (
        <div className="flex items-center justify-center">
            <div className="bg-transparent rounded-lg py-10 w-full">

                {confirmedAccount ? (
                    <div className='flex flex-col justify-center items-center'>
                        <div className="mt-8 text-center b w-full bg-green-950 mb-12">
                            <h2 className='text-green-100 p-4'>Cuenta confirmada correctamente.</h2>
                        </div>
                    </div>

                ) : (
                    <div className='mt-8 text-center b w-full bg-red-950 mb-12'>
                        <h2 className='text-red-100 p-4'>No fue posible confirmar tu cuenta.</h2>
                    </div>
                )}


            </div>
        </div>
    );
};

export default ConfirmAccount;
