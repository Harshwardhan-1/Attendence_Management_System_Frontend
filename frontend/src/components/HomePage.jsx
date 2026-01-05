import './HomePage.css';
export default function HomePage({userData}){
    return(
        <>
        <h1>Welcome to HomePage</h1>
        <p>{userData?.name}</p>

        </>
    );
}     