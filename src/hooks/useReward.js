/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import { restService } from 'utilities';
import useRefresh from './useRefresh';

export const useRewardData = (address, refresh) => {
  const numberFormat = Intl.NumberFormat('en-US');

  const { slowRefresh } = useRefresh();
  const [stakingPoint, setStakingPoint] = useState(0);
  const [estimatedReward, setEstimatedReward] = useState(0);
  const [totalReserve, setTotalReserve] = useState(0);
  const [reserveApy, setReserveApy] = useState(0);
  const [reservePrimeApy, setReservePrimeApy] = useState(0);
  const [claimableReward, setClaimableReward] = useState(0);

  useEffect(() => {
    const fetchRewardData = async () => {
      const data = await restService({
        api: '/prime',
        method: 'GET',
        params: {}
      });

      setTotalReserve(data.data.data.totalReservesUsd);

      if (Number(data.data.data.totalLockedUsd) > 0) {
        setReserveApy(
          ((Number(data.data.data.totalReservesUsd) * 12 * 100) /
            Number(data.data.data.totalLockedUsd) +
            Number(data.data.data.baseApr) * 100) *
            2
        );

        setReservePrimeApy(
          (Number(data.data.data.totalReservesUsd) * 12 * 100) /
            Number(data.data.data.totalLockedUsd)
        );
      } else setReserveApy(Number(data.data.data.baseApr) * 100 * 2);

      if (address) {
        const scoreData = await restService({
          api: `/prime/score?address=${address}`,
          method: 'GET',
          params: {}
        });

        setStakingPoint(
          Number(scoreData.data.data.pending.userScore) * 1000000
        );

        if (scoreData.data.data.pending.totalScore > 0)
          setEstimatedReward(
            (Number(scoreData.data.data.pending.totalReward) *
              Number(scoreData.data.data.pending.userScore)) /
              Number(scoreData.data.data.pending.totalScore)
          );

        setClaimableReward(Number(scoreData.data.data.claimableAmount));
      }
    };

    fetchRewardData();
  }, [slowRefresh, address, refresh]);

  return {
    stakingPoint: stakingPoint.toFixed(2),
    estimatedReward: numberFormat.format(estimatedReward),
    claimableReward: numberFormat.format(claimableReward),
    totalReserveReward: numberFormat.format(totalReserve),
    reserveApy: reserveApy.toFixed(1),
    reservePrimeApy: reservePrimeApy.toFixed(1)
  };
};
