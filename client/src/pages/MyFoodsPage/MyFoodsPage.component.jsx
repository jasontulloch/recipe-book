import React from 'react';
import MyFoodsPageMobile from './MyFoodsPageMobile.component';
import { useSelector } from 'react-redux';

import { isMobile } from 'react-device-detect';

const MyFoodsPage = () => {

    const chefLogin = useSelector(state => state.chefLogin)
    const { chefInfo } = chefLogin

    return (
        <div>
            {(isMobile && chefInfo) && (
                <MyFoodsPageMobile />
            )}
        </div>
    )


}

export default MyFoodsPage;