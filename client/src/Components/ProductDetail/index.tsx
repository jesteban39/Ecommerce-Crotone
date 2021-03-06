import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, NavLink as Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { FaStar } from "react-icons/fa";
import { getProductsDetail } from '../../Redux/Actions/Products/getProductsDetail';
import { state, product, photo } from '../../typesApp'
import EditingProduct from './editingComp';
import { AddCart } from '../Cart/AddCart'
import { Reviews } from '../Products/Reviews'
import toast, { Toaster } from 'react-hot-toast';
import config from '../../../src/config';
import './productDetail.css';

const colors = {
  orange: "#FFBA5A",
  grey: "#a9a9a9"
};

const ProductDetail = () => {
  const dispatch = useDispatch();
  const detail: product = useSelector((s: state) => s.productsDetail);
  const userLog = useSelector((state: state) => state.user);
  const { id } = useParams<{ id: string }>();
  const [container, setContainer] = useState<any>()
  const [photo, setPhoto] = useState(0);
  const [show, setShow] = useState<boolean>(false);
  const [show2, setShow2] = useState<boolean>(true);
  const [currentValue, setCurrentValue] = useState(0);
  const [hoverValue, setHoverValue] = useState(undefined);
  const stars = Array(5).fill(0)

  const { handleSubmit } = useForm();


  const [review, setReview] = useState({
    text: '',
    stars: 0,
    ProductId: 0,
  });

  function handleReview(e: any) {
    setReview({
      text: e.target.value,
      stars: currentValue,
      ProductId: detail.id
    });
  };

  const notify = () => toast.success('Successfully review created!');

  const onSubmit = async () => {
    await axios.post(`http://${config.REACT_APP_API_URL}:3001/api/reviews`, review);
    notify();
  };

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

  const changeFlag = () => {
    setShow(!show)
  };

  const changeEditing = () => {
    setShow2(!show2)
  };


  const handleClick = (value: any) => {
    setCurrentValue(value)
  };

  const handleMouseOver = (newHoverValue: any) => {
    setHoverValue(newHoverValue)
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined)
  };

  useEffect(() => {
    dispatch(getProductsDetail(parseInt(id)));
    const res: any = axios.get<any>(`http://${config.REACT_APP_API_URL}:3001/api/reviews/${id}`)
      .then(res => {
        setContainer(res.data)
      })
  }, [dispatch, id]);

  return (
    <div>
      <div className='product-detail'>
        <div className='imgs'>
          <Link to='/home'><button className='btn-back'>Back to page</button></Link>
          <div className='product-img'>
            <img src={detail.photos[photo]?.url} alt='img not found' width='380px' height='380px' />
          </div>
          <div className='subdetail'>
            <button name='prev' onClick={changePhoto}>{`<`}</button>
            {detail.photos.map((f: photo) =>
              <img src={f.url} width='50px' height='50px' alt='not found' />
            )}
            <button name='next' onClick={changePhoto}>{`>`}</button>
          </div>
        </div>
        <div className='detail'>
           {
              userLog.userType==="Admin"&&<button className='btn-edit' onClick={changeEditing}>Edit product</button> 
           }
          {show2 ?
            <div>
              <h1>{detail.name}</h1>
              <h2>${detail.price}.00</h2>
              <h3>{detail.description}</h3>
              <h3>Stock:{detail.stock <= 0 ? <span>No disponible</span> : detail.stock}</h3>
              <h3>Brand: {detail.brand.name}</h3>
              <AddCart product={detail} />
              <Reviews productId={detail.id} />
              {/* <h3>Review: {review.text}</h3>
              {
                container?.map((r: any) => {
                  return (
                    <div><span>{r.text} {r.stars}</span></div>
                  )
                })
              }
              <div className='form-review'>
                <button className='btn-review' onClick={changeFlag}>Write review</button>
                {show &&
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
                      <div className='add-review'>
                        <textarea className='text-add'
                          name="review"
                          placeholder="Enter the description review..."
                          onChange={handleReview} />
                        <button className='btn-addreview' onClick={handleSubmit(onSubmit)} >
                          Submit
                        </button>
                      </div>
                      <Toaster />
                    </form>
                  </div>
                }
              </div> */}
            </div>
            :
            <div>
              <EditingProduct
                id={detail.id}
                name={detail.name}
                stock={detail.stock}
                price={detail.price}
                description={detail.description}
                categories={detail.categories}
                brand={detail.brand}
              />
            </div>
          }
        </div>
      </div>
    </div >
  );
};

export default ProductDetail;