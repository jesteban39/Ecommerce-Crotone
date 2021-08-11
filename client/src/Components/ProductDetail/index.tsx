import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useForm } from "react-hook-form";
import toast, { Toaster } from 'react-hot-toast';
import { getProductsDetail } from '../../Redux/Actions/Products/getProductsDetail';
import './productDetail.css';
import { FaStar } from "react-icons/fa";

const colors = {
    orange: "#FFBA5A",
    grey: "#a9a9a9"

};

type KeyParams = {
    id: string;
};

const ProductDetail = () => {
    const { id } = useParams<KeyParams>();
    const detail = useSelector((s: any) => s.productsDetail);
    const dispatch = useDispatch();
    const [photo, setPhoto] = useState(0);
    const [show, setShow] = useState<boolean>(false);

    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const [review, setReview] = useState({
        review: '',
        stars: 0,
        id: 0,
    });

    function handleInput(e: any) {
        setReview({
            review: e.target.value,
            stars: currentValue,
            id: detail.id
        });
    };

    const notify = () => toast.success('Successfully created!');

/*     const onSubmit = (data: any) => (console.log(data), notify(), reset()) */
    const onSubmit = () => (console.log(review), notify(), reset())

    
    const changePhoto = (e: any) => {
        const action = e.target.name;
        if (action === 'next') {
            if (photo < detail.photos.length - 1) {
                setPhoto(photo + 1)
            }
        } else {
            if (photo > 0) {
                setPhoto(photo - 1)
            }
        }
    };

    const [currentValue, setCurrentValue] = useState(0);
    const [hoverValue, setHoverValue] = useState(undefined);
    const stars = Array(5).fill(0)

    const handleClick = (value: any) => {
        setCurrentValue(value)
    }

    const handleMouseOver = (newHoverValue: any) => {
        setHoverValue(newHoverValue)
    };

    const handleMouseLeave = () => {
        setHoverValue(undefined)
    }

const [detallaso, setDetallaso] = useState<any>()

    useEffect(() => {
        dispatch(getProductsDetail(parseInt(id)));
/*         setTimeout(() => {
            setDetallaso({
                ...detail, 
                stock: 0
            })
        }, 0) */
    }, [dispatch, id]);
/*     let flag = false; */

    const changeFlag = () => {
        setShow(!show)
    };

    return (
        <div>
            <div className='product-detail'>
                <div className='product-img'>
                    <img src={detail.photos ? detail.photos[photo].url : ''} alt='img not found' width='380px' height='380px' />
                </div>
                <div className='detail'>
                    <h1>{detail.name}</h1>
                    <h2>${detail.price}.00</h2>
                    <h3>Stock: {detail?.stock <= 0 ? <span>No disponible</span> : detail.stock}</h3>
                    <h3>Brand: {detail.brand ? detail.brand.name : ''}</h3>
                    <h3>Review: {detail.review}</h3>
                    <div className='subdetail'>
                        <button name='prev' onClick={changePhoto}>{`<`}</button>
                        {detail.photos ? detail.photos.map((f: any) => <img src={f.url} width='50px' height='50px' alt='not found'></img>) : ''}
                        <button name='next' onClick={changePhoto}>{`>`}</button>
                    </div>
                </div>

                <button onClick={changeFlag}>Clickame papu</button>
                { show &&
                <div>
                    <h3> Write a review and rating </h3>
                    <form>
                        <div>
                            {stars.map((_, index) => {
                                return (
                                    <FaStar
                                        key={index}
                                        size={24}
                                        onClick={() => handleClick(index + 1)}
                                        onMouseOver={() => handleMouseOver(index + 1)}
                                        onMouseLeave={handleMouseLeave}
                                        color={(hoverValue || currentValue) > index ? colors.orange : colors.grey}
                                        style={{ marginRight: 10, cursor: "pointer" }} />
                                )
                            })}
                        </div>
                        <input
                            type="text"
                            name="rewview"
                            placeholder="Enter the description"
                            onChange={handleInput} />

                    <button onClick={handleSubmit(onSubmit)} >
                        Submit
                    </button>
                    </form>
                </div>
                }
        </div>
        </div >
    );
};

/* const styles = {
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
    stars: {
        display: "flex",
        flexDirection: "row",
    },
    textarea: {
        border: "1px solid #a9a9a9",
        borderRadius: 5,
        padding: 10,
        margin: "20px 0",
        minHeight: 100,
        width: 300
    },
    button: {
        border: "1px solid #a9a9a9",
        borderRadius: 5,
        width: 300,
        padding: 10,
    }

}; */
export default ProductDetail;