'use client'
import { useEffect, useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';
    

const LoanForm = () => {
    const [loanAmount, setLoanAmount] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [tenure, setTenure] = useState('');
    const [additionalDetails, setAdditionalDetails] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        // Process form submission, e.g., send data to backend
        console.log({
            loanAmount,
            interestRate,
            tenure,
            additionalDetails
        });
        // Reset form fields
        setLoanAmount('');
        setInterestRate('');
        setTenure('');
        setAdditionalDetails('');
    };

    const search = useSearchParams();
    const applicationId = search.get('id');
    //const applicationId = "822179335";
    const [application, setApplication] = useState(null);

    useEffect(() => {
        // Fetch application details
        const fetchApplication = async () => {
            if (applicationId) {
                try {
                    const appRef = doc(db, 'applications', applicationId);
                    const appSnap = await getDoc(appRef);
                    if (appSnap.exists()) {
                        setApplication(appSnap.data());
                        toast.success('Application found!');
                    } else {
                        toast.error('Application not found!');
                    }
                } catch (error) {
                    console.error('Error fetching application:', error);
                    toast.error('Error fetching application!');
                }
            }
        };
        fetchApplication();
    }, [applicationId]);



    return (
        <div className="flex justify-center w-screen  gap-10 mt-10">
            {/* SME Details */}
            <div className="w-1/3 mt-20 ml-10  bg-gray-900 text-white p-6 rounded-md shadow-md h-screen">
                <h2 className="text-xl font-semibold mb-4 text-gray-700">SME Details</h2>
                <div className=" mx-auto mt-24 flex justify-center w-full">
            {application && (
                <div className=" shadow-md  bg-blue-800 rounded-lg p-8">
                    <h1 className="text-2xl font-bold mb-4">{application.companyName}</h1>
                    <br></br>
                    <p className='text-xl'><strong>Loan Purpose:</strong> {application.loanPurpose}</p>
                    <p className='text-xl'><strong>Pitch:</strong> {application.pitch}</p>
                    <p className='text-xl'><strong>Loan Amount:</strong> {application.loanAmount}</p>
                    <p className='text-xl'><strong>Amout Received:</strong> {application.loanAmount}</p>
                    <p className='text-xl'><strong>Amount Left:</strong> {application.loanAmount - application.loanAmount}</p>
                </div>
            )}
        </div>
                </div>
        <div className="w-1/3  mt-20 bg-gray-900 text-white p-6 rounded-md shadow-md h-screen ">
            <h2 className="text-xl font-semibold mb-4 text-gray-700 ">Loan Details</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-700">Loan Amount</label>
                    <input
                        type="number"
                        id="loanAmount"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50"
                        placeholder="Enter loan amount"
                        value={loanAmount}
                        onChange={(e) => setLoanAmount(e.target.value)}
                        required
                    />
                </div>
                <br></br>
                <div className="mb-4">
                    <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700">Interest Rate (%)</label>
                    <input
                        type="number"
                        id="interestRate"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50"
                        placeholder="Enter interest rate"
                        value={interestRate}
                        onChange={(e) => setInterestRate(e.target.value)}
                        required
                    />
                </div>
                <br></br>
                <div className="mb-4">
                    <label htmlFor="tenure" className="block text-sm font-medium text-gray-700">Tenure (in months)</label>
                    <input
                        type="number"
                        id="tenure"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50"
                        placeholder="Enter tenure"
                        value={tenure}
                        onChange={(e) => setTenure(e.target.value)}
                        required
                    />
                </div>
                <br></br>
                <div className="mb-4">
                    <label htmlFor="additionalDetails" className="block text-sm font-medium text-gray-700">Additional Details</label>
                    <textarea
                        id="additionalDetails"
                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-400 focus:ring-opacity-50"
                        placeholder="Provide additional details"
                        value={additionalDetails}
                        onChange={(e) => setAdditionalDetails(e.target.value)}
                    />
                </div>
                <br></br>
                <button
                    type="submit"
                    className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
                >
                    Make a Bid
                </button>
            </form>
        </div>
        </div>
        
    );
};

export default LoanForm;