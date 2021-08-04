import React, { useEffect } from 'react';
import MyFoodsPageMobile from './MyFoodsPageMobile.component';
import { useSelector } from 'react-redux';

import { isMobile } from 'react-device-detect';

const MyFoodsPage = ({ history }) => {

    const chefLogin = useSelector(state => state.chefLogin)
    const { chefInfo } = chefLogin

    useEffect(() => {
        if(!chefInfo) {
            history.push('/login')
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