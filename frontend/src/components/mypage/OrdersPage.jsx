import axios from 'axios';
import { useEffect, useState } from 'react';
import { Header } from '../header';
import { DeliveryItem } from '../posts/DeliveryItem';
import { MyPage } from './MyPage';
import { dummyDeliveryRecruitment } from '../posts';

export const OrdersPage = () => {
  function calculatePostRemainingTime(createdAt) {
    const now = new Date(); // 현재 시간

    const createdDate = new Date(createdAt);

    // 현재 시간에 30분을 더함
    const deadline = new Date(createdDate.getTime() + 30 * 60000); // 30분 = 30 * 60 * 1000 밀리초

    const remainingTime = deadline - now;

    const remainingMinutes = Math.ceil(remainingTime / 60000);

    return remainingMinutes;
  }

  return (
    <div id="justify-center">
      <Header />
      <div id="flex-row" style={{ justifyContent: 'center' }}>
        <MyPage />
        <div id="inner-wrap">
          <h3>주문 히스토리</h3>
          {dummyDeliveryRecruitment?.data !== undefined ? (
            <div>loading...</div>
          ) : dummyDeliveryRecruitment?.length !== 0 ? (
            <div id="main-screen-mypage">
              <div id="delivery-recruitment-list-mypage">
                {dummyDeliveryRecruitment
                  ?.slice()
                  .reverse()
                  .slice(0, 5)
                  .map(({ postId, restaurant, menu, nickname, recruit, timer, cost, isValid }) => (
                    <DeliveryItem
                      key={postId}
                      id={postId}
                      restaurant={restaurant}
                      menu={menu}
                      recruiter={nickname}
                      recruited={'N'}
                      recruit={recruit}
                      timer={timer > 0 ? timer : '0'}
                      cost={cost}
                      isValid={isValid}
                    />
                  ))}
              </div>
            </div>
          ) : (
            <h1 id="inner-wrap" style={{ color: 'darkgreen' }}>
              아직 게시글이 없습니다.
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};
