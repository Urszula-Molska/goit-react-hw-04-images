import { ColorRing } from 'react-loader-spinner';

import css from './Loader.module.css';

export const Loader = () => (
  <div className={css.loaderCont}>
    <ColorRing
      className={css.loader}
      visible={true}
      height="100"
      width="100"
      ariaLabel="blocks-loading"
      wrapperStyle={{}}
      wrapperClass="blocks-wrapper"
      colors={['#3f51b5', '#3f51b5', '#3f51b5', '#3f51b5', '#3f51b5']}
    />
  </div>
);
