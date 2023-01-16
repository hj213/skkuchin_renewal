import { useDispatch, useSelector } from "react-redux"
import { load_places } from "../actions/place/place";
import Layout from "../hocs/Layout";

export default function list(){

    const dispatch = useDispatch();
    const dispatchPlace = () => dispatch(load_places);
    const place = useSelector(state => state.place.place);
    const user = useSelector(state => state.auth.user);


    return(
       <Layout>
            {/* {user.map(item => (<div key={item.id}>{item}</div>))} */}
            {/* {user.nickname} */}
        </Layout>
    )
}