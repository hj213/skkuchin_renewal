import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react"; 
import { check_admin } from '../actions/auth/auth';
import { useRouter } from 'next/router';
import { load_menu, enroll_menu, modify_menu, delete_menu } from '../actions/menu/menu';
import { clear_search_results } from '../actions/place/place';

const PlaceMenu = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const menus = useSelector(state => state.menu.menu);

    const place_id = router.query.place_id;
    const place_name = router.query.place_name;

    const [addMode, setAddMode] = useState(false);
    const [modifyMode, setModifyMode] = useState(null);
    const [newName, setNewName] = useState('');
    const [newPrice, setNewPrice] = useState(0);
    const [modifiedName, setmodifiedName] = useState('');
    const [modifiedPrice, setModifiedPrice] = useState(0);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        dispatch(check_admin(([result, message]) => {
            if (!result) {
                router.push('/');
            }
        }));
        return (() => {
            dispatch(clear_search_results());
        })
    }, []);

    useEffect(() => {
        if (place_id) {
            dispatch(load_menu(place_id));
        }
    }, [place_id]);

    const handleAddClick = () => {
        setAddMode(true);
    };

    const handleAddSubmit = () => {
        setLoading(true);
        dispatch(enroll_menu(place_id, newName, newPrice, () => {
            setNewName('');
            setNewPrice(0);
            setAddMode(false);
            setLoading(false);
        }));
    };

    const handleAddCancel = () => {
        setNewName('');
        setNewPrice(0);
        setAddMode(false);
    };

    const handleModifyClick = (menu) => {
        setModifyMode(menu.id);
        setmodifiedName(menu.name);
        setModifiedPrice(menu.price);
    };

    const handleModifySubmit = (menu) => {
        setLoading(true);
        dispatch(modify_menu(place_id, menu.id, modifiedName, modifiedPrice, () => {
            setmodifiedName('');
            setModifiedPrice(0);
            setModifyMode(null);
            setLoading(false);
        }));
    };

    const handleModifyCancel = () => {
        setmodifiedName('');
        setModifiedPrice(0);
        setModifyMode(null);
    };

    const handleDeleteClick = (menu) => {
        const confirmDelete = window.confirm(`${menu.name}를 삭제하시겠습니까?`);
        if (confirmDelete) {
            setLoading(true);
            dispatch(delete_menu(place_id, menu.id, () => {
                setLoading(false);
            }));
        }
    };

    const handleNewNameChange = (event) => {
        setNewName(event.target.value);
    };

    const handleNewPriceChange = (event) => {
        setNewPrice(event.target.value);
    };

    const handleModifiedNameChange = (event) => {
        setmodifiedName(event.target.value);
    };

    const handleModifiedPriceChange = (event) => {
        setModifiedPrice(event.target.value);
    };


    return (
        <div>
            {loading && 
                <div style={{ 
                    position: 'fixed', 
                    top: 0, 
                    left: 0, 
                    width: '100%', 
                    height: '100%', 
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
                    zIndex: 9999, 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center' 
                }}>
                    <div style={{ 
                        backgroundColor: '#fff', 
                        borderRadius: '4px', 
                        padding: '16px 24px', 
                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' 
                    }}>
                        <p>Loading...</p>
                    </div>
                </div>
            }
            <h1>
                {place_name}
            </h1>
            <ul style={{listStyle: 'none'}}>
                {menus === null && <h2>메뉴 로딩중...</h2>}
                {menus && menus.length === 0 && <h2>메뉴가 없습니다!</h2>}
                {menus && menus.map((menu, index) => (
                    <li key={index}>
                        {modifyMode === menu.id ? (
                            <>
                                <h2>
                                    {menu.name}
                                </h2>
                                <p>
                                    {menu.price}
                                </p>
                                <input type="text" value={modifiedName} onChange={handleModifiedNameChange} required />
                                <input type="number" value={modifiedPrice} onChange={handleModifiedPriceChange} required />
                                <button onClick={() => handleModifySubmit(menu)}>확인</button>
                                <button onClick={() => handleModifyCancel()}>취소</button>
                            </>
                        ) : (
                            <>
                                <h2>
                                    {menu.name}
                                </h2>
                                <p>
                                    {menu.price}
                                </p>
                                <button onClick={() => handleModifyClick(menu)}>수정</button>
                                <button onClick={() => handleDeleteClick(menu)}>삭제</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
            {addMode ? (
                <>
                    <input type="text" value={newName} onChange={handleNewNameChange} required />
                    <input type="number" value={newPrice} onChange={handleNewPriceChange} required />
                    <button onClick={handleAddSubmit}>확인</button>
                    <button onClick={handleAddCancel}>취소</button>
                </>
            ) : (
                <button onClick={handleAddClick}>메뉴 추가</button>
            )}
        </div>
    );
}

export default PlaceMenu;
