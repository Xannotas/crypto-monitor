import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { TRootState } from '../../store';
import { TCoinInfo } from '../../types';
import { coinsSelector, isFetchingSelector } from '../../store/topCoinsList/selectors';

import TopCoinsTable from '../../components/TopCoinsTable';
import { getCoins } from '../../store/topCoinsList/actions'

type TStateProps = {
  coins: TCoinInfo[],
  isFetching: boolean
}
type TDispatchProps = {
  getCoins: () => void
}

const CoinPage: React.FC<TStateProps & TDispatchProps> = ({ coins, getCoins, isFetching }) => {

  useEffect(() => {
    getCoins()
  }, []) // eslint-disable-line

  return (
    <section className="coins">
      {isFetching
        ? <p>loading...</p>
        : <>
          { coins.length
            ? <TopCoinsTable coins={coins} />
            : <p>no items</p>
          }
        </>
      }
    </section>
  );
}

const mapState = (state: TRootState) => ({
  coins: coinsSelector(state),
  isFetching: isFetchingSelector(state)
})

export default connect<TStateProps, TDispatchProps, {}, TRootState>(mapState, { getCoins })(CoinPage);
