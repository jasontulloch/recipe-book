import React, { useEffect } from 'react';
import MyFoodsPageMobile from './MyFoodsPageMobile.component';
import { useSelector } from 'react-redux';

import { isMobile, isBrowser } from 'react-device-detect';

const MyFoodsPage = ({ history }) => {

    const chefLogin = useSelector(state => state.chefLogin)
    const { chefInfo } = chefLogin

    useEffect(() => {
        if(!chefInfo) {
            history.push('/login')
        }
        if(isBrowser) {
            history.push('/savedrecipes')
        }

      }, [
        chefInfo,
    ])

    return (
        <div>
            {(isMobile && chefInfo) && (
                <MyFoodsPageMobile />
            )}
        </div>
    )


}

export default MyFoodsPage;