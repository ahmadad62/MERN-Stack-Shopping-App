import "./newProduct.css";
import { useState } from "react"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";
import  {addProduct} from "../../redux/apiCalls"
import {useDispatch} from "react-redux"


export default function NewProduct() {

  const [inputs, setInputs] = useState({});
  const [cat, setCat] = useState([]);
  const [file, setFile] = useState(null);
  const dispatch=useDispatch()

  const handelChange = (e) => {
    setInputs(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }
  console.log(inputs);


  const handelCat = (e) => {
    const categories = (e.target.value.split(",")).map(c => c.trim())
    setCat(categories)
  };
console.log(cat);

  const handleClick = (e) => {
    e.preventDefault()
    //uniq name for image
    const fileName = new Date().getTime() + file.name;

    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log('Upload is ' + progress + '% done');
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          const product={...inputs,img:downloadURL,categories:cat};
          addProduct(product,dispatch)
        });
      }
    );
  }

  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="file" onChange={e => setFile(e.target.files[0])} />
        </div>

        <div className="addProductItem">
          <label>Title</label>
          <input name="title" type="text" placeholder="Apple Airpods" onChange={handelChange} />
        </div>

        <div className="addProductItem">
          <label>Description</label>
          <input name="desc" type="text" placeholder="Description..." onChange={handelChange} />
        </div>

        <div className="addProductItem">
          <label>Price</label>
          <input name="price" type="number" placeholder="100" onChange={handelChange} />
        </div>
        <div className="addProductItem">
          <label>Category</label>
          <input type="text" placeholder="jeans, T-shirt" onChange={handelCat} />
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select name="inStock">
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>
        <button className="addProductButton" onClick={handleClick}>Create</button>
      </form>
    </div>
  );
}
