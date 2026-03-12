/**
 * এই ফাংশনটি Dataentry.html এবং Dataentryauto.html এর প্রিন্ট বাটনের সাথে যুক্ত করুন।
 * এটি ফরম থেকে ডাটা সংগ্রহ করে লোকাল স্টোরেজে সেভ করে এবং ইনভয়েস প্রিভিউ পেজটি ওপেন করে।
 */
function handlePrint() {
    try {
        // ১. ডাটা সংগ্রহের জন্য হেল্পার ফাংশন
        const getVal = (id) => {
            const el = document.getElementById(id);
            if (!el) return "";
            // ইনপুট ফিল্ড হলে .value নেবে, অন্যথায় .innerText নেবে
            const val = el.value !== undefined ? el.value : el.innerText;
            return val ? val.trim() : "";
        };

        // ২. ফরম থেকে ডাটা সংগ্রহ (আপনার দেওয়া HTML আইডি অনুযায়ী)
        const customerData = {
            cod: getVal('cod') || 'N/A',
            custName: getVal('custName') || 'Unknown Customer',
            address: getVal('address') || '',
            area: getVal('area') || '',
            mobile: getVal('mobile') || '',
            
            // ইনভয়েস ও পেমেন্ট ইনফো
            invoiceNo: "INV-" + Date.now().toString().slice(-6),
            payType: getVal('payType') || 'Cash',
            custType: getVal('custType') || 'Regular',
            openingBalance: getVal('openingBalance') || '0.00',
            
            // ৩. টেবিলের রো কপি করা (ID: statementBody)
            tableBody: document.getElementById('statementBody')?.innerHTML || '',
            
            // ৪. মোট হিসাব
            totalDeposit: getVal('totalDeposit') || '0.00',
            totalExpense: getVal('totalExpense') || '0.00',
            finalBalance: getVal('finalBalance') || '0.00',
            finalInWord: getVal('inwordText') || getVal('finalBalanceInWord') || ''
        };

        // ৫. ডাটাটি লোকাল মেমোরিতে সেভ করা
        localStorage.setItem('printData', JSON.stringify(customerData));

        // ৬. ইনভয়েস টেমপ্লেট নতুন ট্যাবে ওপেন করা
        const previewWindow = window.open('invoicetamplete.html', '_blank');
        
        if (!previewWindow) {
            alert("পপ-আপ উইন্ডো ব্লক করা হয়েছে। দয়া করে ব্রাউজার থেকে পপ-আপ এলাউ করুন।");
        }
        
    } catch (error) {
        console.error("প্রিন্ট ত্রুটি:", error);
        alert("প্রিন্ট প্রিভিউ তৈরি করা যাচ্ছে না। ডাটা সংগ্রহের সময় সমস্যা হয়েছে।");
    }
}
