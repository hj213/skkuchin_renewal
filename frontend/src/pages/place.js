import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { load_place, load_places } from "../actions/place/place";

import Layout from "../hocs/Layout";
import Loader from "react-loader-spinner";

const PlacePage = () => {
const router = useRouter();
const dispatch = useDispatch();

const places = useSelector(state => state.place.place);

const [place_id, setPlaceId] = useState('');
const user = useSelector(state => state.auth.user);
const [placeInfo, setPlaceInfo] = useState(null);

useEffect( () => {
    if(dispatch && dispatch !== null && dispatch !== undefined)
        dispatch(load_places());
}, [dispatch]);

const onChangePId = e => setPlaceId(e.target.value);

const handleStoreClick = (id) => {
  dispatch(load_place(id))
    .then(data => setPlaceInfo(data.payload))
}


return (
    <Layout title= '스꾸친 | Place' content='Place page'>
        <h1 className='display-4'>Place Page</h1>
        <p className="fs-4 mt-3">Hello {user !== null && user.nickname}!</p>
        <div className='bg-light p-5 mt-5 mb-5'>
            <h3>*Place 목록</h3>

            <div>
                { placeInfo !== null ? 
                  <div>
                    <h4>{placeInfo.name}</h4>
                    <p>{placeInfo.category}</p>
                    <p>{placeInfo.campus}</p>
                  </div> :
                  places.map((place, index) => (
                    <div className='p-3' key={index} onClick={() => handleStoreClick(place.id)}>
                        <h4>{place.name}</h4>
                        
                    </div>
                ))}
            </div>
        </div>
    </Layout>
);
};

export default PlacePage;

// import { useRouter } from "next/router";
// import { useState, useEffect } from "react";
// import { useSelector, useDispatch } from 'react-redux';
// import { load_place, load_places } from "../actions/place/place";

// import Layout from "../hocs/Layout";
// import Loader from "react-loader-spinner";

// const PlacePage = () => {
//     const router = useRouter();
//     const dispatch = useDispatch();
    
//     const places = useSelector(state => state.place.place);

//     const [place_id, setPlaceId] = useState('');
//     const user = useSelector(state => state.auth.user);

//     useEffect( () => {
//         if(dispatch && dispatch !== null && dispatch !== undefined)
//             dispatch(load_places());
//     }, [dispatch]);

//     const onChangePId = e => setPlaceId(e.target.value);

//     const handleStoreClick = (id) => {
//       router.push(`api/place/${id}`);
//     }


//     return (
//         <Layout title= '스꾸친 | Place' content='Place page'>
//             <h1 className='display-4'>Place Page</h1>
//             <p className="fs-4 mt-3">Hello {user !== null && user.nickname}!</p>
//             <div className='bg-light p-5 mt-5 mb-5'>
//                 <h3>*Place 목록</h3>
//                 <div>
//                     { places.map((place, index) => (
//                         <div className='p-3' key={index} onClick={() => handleStoreClick(place.id)}>
//                             <h4>{place.name}</h4>
//                             <p>{place.category}</p>
//                             <p>{place.campus}</p>
//                         </div>
//                     ))}
//                 </div>
//             </div>
//         </Layout>
//     );
// };

// export default PlacePage;
