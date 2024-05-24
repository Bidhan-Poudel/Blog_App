
import classes from './components/navbar/navbar.module.css';
import CardContainer from './components/Container/CardContainer';
import Navbar from './components/navbar/navbar';



export default function Home() {
  return (
    <div style={{ display: 'flex' }}>
      <Navbar name="Home" />
      <div className={classes.content}>
        <CardContainer location="Home" />
      </div>
    </div>
  );
}
