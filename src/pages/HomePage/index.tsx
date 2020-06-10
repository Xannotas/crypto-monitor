import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import { TRootState } from '../../store';
import { TCoinInfo } from '../../types';
import { getCoins } from '../../store/topCoinsList/actions'
import { coinsSelector, isFetchingSelector, errorSelector } from '../../store/topCoinsList/selectors';

import TopCoinsTable from '../../components/TopCoinsTable';
import Loader from '../../components/Loader';
import CurrencyConverter from '../../containers/CurrencyConverter';

type TStateProps = {
  coins: TCoinInfo[],
  isFetching: boolean,
  error: string
}
type TDispatchProps = {
  getCoins: () => void
}

const HomePage: React.FC<TStateProps & TDispatchProps> = ({ coins, getCoins, isFetching, error }) => {
  const coinsUpdateTimeMs = 130 * 1000
  useEffect(() => {
    getCoins()
    const intervalUpdate = setInterval(() => {
      getCoins()
    }, coinsUpdateTimeMs)

    return () => {
      clearInterval(intervalUpdate)
    }
  }, []) // eslint-disable-line

  return (
    <section className="coins">
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            {isFetching && !coins.length && !error
              ? <Loader />
              : <>
                {coins.length &&
                  <TopCoinsTable coins={coins} />
                }
              </>
            }
          </div>
          <div className="col-md-4">
            <CurrencyConverter />
          </div>
        </div>
      </div>

    </section>
  );
}

const mapState = (state: TRootState): TStateProps => ({
  coins: coinsSelector(state),
  isFetching: isFetchingSelector(state),
  error: errorSelector(state)
})

export default connect<TStateProps, TDispatchProps, {}, TRootState>(mapState, { getCoins })(HomePage);
