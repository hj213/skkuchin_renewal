import { useDispatch, useSelector } from "react-redux"
import Layout from "../hocs/Layout";

export default function list(){

    const dispatch = useDispatch();
    dispatch(load_place());
    // const place = useSelector(state => state.place);
    // console.log(place);

    return(
       <Layout>
        </Layout>
    )
}