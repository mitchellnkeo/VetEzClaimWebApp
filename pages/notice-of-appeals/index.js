import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setPageTitle } from '../../store/slices/themeConfigSlice';
import FrontLayout from '@/components/layouts/FrontLayout';
import {
  doc,
  getDoc,
  getDocs,
  updateDoc,
  collection,
} from 'firebase/firestore';
import { db } from '@/firebase/firebase';
import DataTable from 'react-data-table-component';
import 'tippy.js/dist/tippy.css';
import { getPdf } from '@/services/utils';

const NoticeOfAppeals = () => {
  const dispatch = useDispatch();
  const [courtForms, setCourtForms] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [search, setSearch] = useState('');

  useEffect(() => {
    dispatch(setPageTitle('Notice of Appeals'));
  }, [dispatch]);

  const getAllCourtforms = async () => {
    try {
      setIsLoading(true);

      const result = [];
      const querySnapshot = await getDocs(collection(db, 'courtform'));
      querySnapshot.forEach((doc) => {
        const form = { uid: doc.id, ...doc.data() };
        // console.log('>>form: ', form);
        const {
          agreedToShareInfo,
          urlDocspring,
          guid,
          appeallantName,
          phone,
          email,
          uid,
        } = form;

        // Skip if guid is missing or empty
        if (!guid || typeof guid !== 'string' || guid.trim() === '') return;

        // Handle guid(s)
        const guidList = guid.includes('|')
          ? guid.split('|').filter((g) => g)
          : [guid.trim()];
        const urlList =
          urlDocspring && urlDocspring.includes('|')
            ? urlDocspring.split('|').filter((u) => u)
            : [urlDocspring?.trim()].filter((u) => u); // handle single URL

        // If mismatched counts, skip the form
        if (guidList.length !== urlList.length) return;

        // Build a map of guid => url
        const guidUrlMap = {};
        guidList.forEach((g, i) => {
          guidUrlMap[g] = urlList[i] || null;
        });

        // Ensure agreedToShareInfo is valid
        if (!Array.isArray(agreedToShareInfo) || agreedToShareInfo.length === 0)
          return;

        // Map each agreedToShareInfo item
        agreedToShareInfo.forEach((info) => {
          if (!guidUrlMap[info.guid]) return; // Skip if guid doesn't match
          if (info.isRemoved) return;

          result.push({
            name: appeallantName,
            phone,
            email,
            guid: info.guid,
            isAgree: info.isAgree,
            urlDocspring: guidUrlMap[info.guid],
            uid,
          });
        });
      });

      const reversedResult = result.reverse();
      // console.log('>> All Results :: ', reversedResult);
      setCourtForms(reversedResult);
      setIsLoading(false);
      return result;
    } catch (error) {
      console.error('Error getting courtforms:', error);
      setIsLoading(false);
      return [];
    }
  };

  const extractSubmissionId = (pdfUrl) => {
    const match = pdfUrl.match(/submissions\/(sub_[^/]+)\/download/);
    return match ? match[1] : null;
  };

  const viewPdf = async (pdfUrl) => {
    const submissionId = extractSubmissionId(pdfUrl);
    if (!submissionId) {
      alert('Invalid PDF URL');
      return;
    }

    setShowLoader(true);
    try {
      const response = await getPdf(submissionId);
      if (response.pdf_url) {
        window.open(response.pdf_url, '_blank', 'noopener,noreferrer');
      } else {
        alert('PDF not available');
      }
    } catch (err) {
      console.error(err);
      alert('Failed to fetch PDF');
    } finally {
      setShowLoader(false);
    }
  };

  useEffect(() => {
    getAllCourtforms();
  }, []);

  const removeRecords = async (row) => {
    // console.log(' >> remove row ::', row);
    const uid = row.uid;
    const guid = row.guid;

    const confirmRemove = window.confirm(
      'Are you sure you want to remove this record?'
    );
    if (!confirmRemove) return;

    setShowLoader(true);

    try {
      const ref = doc(db, 'courtform', uid);

      const snap = await getDoc(ref);
      if (!snap.exists()) {
        console.error('Document not found');
        return;
      }

      const data = snap.data();
      const updatedArr = data.agreedToShareInfo.map((item) =>
        item.guid === guid ? { ...item, isRemoved: true } : item
      );

      await updateDoc(ref, { agreedToShareInfo: updatedArr });
      // console.log('✅ Updated successfully');

      // 🔄 Reload UI (soft way: fetch data again OR hard way: reload page)
      // window.location.reload(); // simple option
      // OR if you have a fetch function:
      await getAllCourtforms();
    } catch (err) {
      console.error('Error removing record:', err);
      alert('Failed to remove record.');
    } finally {
      setShowLoader(false); // stop loader
    }
  };

  const columns = [
    {
      name: 'Name',
      selector: (row) => row.name || 'N/A',
      sortable: true,
    },
    {
      name: 'Contact',
      selector: (row) => row.phone || row.hardshipPhone || 'N/A',
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row) => row.email || 'N/A',
      sortable: true,
    },
    {
      name: 'Contact an Attorney',
      selector: (row) => (row.isAgree ? 'Yes' : 'No'),
      sortable: true,
    },
    {
      name: 'PDF',
      cell: (row) =>
        row.urlDocspring ? (
          <button
            className="text-primary underline hover:text-success"
            onClick={() => viewPdf(row.urlDocspring)}
          >
            View PDF
          </button>
        ) : (
          <span className="italic text-gray-400">No PDF Found</span>
        ),
      ignoreRowClick: true,
      sortable: false,
    },
    {
      name: 'Actions',
      cell: (row) => (
        <div className="mx-auto flex w-max items-center gap-4">
          <button
            type="button"
            onClick={() => removeRecords(row)}
            className="flex items-center gap-1 text-red-600 hover:text-success"
            title="Remove"
          >
            Remove
          </button>
        </div>
      ),
      ignoreRowClick: true,
      center: true,
    },
  ];

  const filteredData = courtForms.filter((form) => {
    const searchStr = search.toLowerCase();
    const name = (form.name || '').toLowerCase();
    const email = (form.email || '').toLowerCase();
    const phone = (form.phone || '').toLowerCase();

    return (
      name.includes(searchStr) ||
      email.includes(searchStr) ||
      phone.includes(searchStr)
    );
  });

  return (
    <FrontLayout title="Notice of Appeals">
      <div className="panel border-white-light px-0 dark:border-[#1b2e4b]">
        <div className="invoice-table">
          <div className="justify-content-between mb-4.5 flex flex-col gap-5 px-5 md:flex-row md:items-center">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl">Notice of Appeals List</h1>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Search by name, email or address"
                className="block rounded border-2 py-1.5 pl-1 pr-3 text-base text-gray-900 placeholder:text-gray-400 focus:outline focus:outline-0 sm:text-sm/6"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
          {showLoader && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
            </div>
          )}
          <DataTable
            columns={columns}
            data={filteredData}
            progressPending={isLoading}
            pagination
            highlightOnHover
            pointerOnHover
            persistTableHead
          />
        </div>
      </div>
    </FrontLayout>
  );
};

<style jsx global>{`
  .loader {
    border-radius: 50%;
    border-width: 2px;
    border-style: solid;
    border-color: #0d6efd transparent transparent transparent;
    width: 16px;
    height: 16px;
    animation: spin 0.75s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`}</style>;

export default NoticeOfAppeals;
