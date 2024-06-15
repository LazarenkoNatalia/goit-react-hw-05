import { Vortex } from 'react-loader-spinner';
import stylLoad from './Loader.module.css'

 
export default function Loader() {
    return (
        <div  className={stylLoad.loader}>
           <Vortex
  visible={true}
  height="200"
  width="200"
                ariaLabel="vortex-loading"
                wrapperStyle={{position: 'sticly', bottom: '10px'}}
//   wrapperStyle={{ position: 'absolute', top: '45%', left: '45%' }}
  wrapperClass="vortex-wrapper"
  colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
  />
        </div>
    );
}