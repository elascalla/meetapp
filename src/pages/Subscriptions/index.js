import React, { useState, useEffect, useCallback } from 'react';
import { StatusBar } from 'react-native';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { withNavigationFocus } from 'react-navigation';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';

import api from '~/services/api';
import { Background, MeetupCard, Empty } from '~/components';

import { Container, SubscriptionsList, Loading } from './styles';

import { cancelSubscriptionRequest } from '~/store/modules/meetup/actions';

function Subscriptions({ isFocused }) {
  const dispatch = useDispatch();

  const [subscriptions, setSubscriptions] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [viewable, setViewable] = useState([]);

  const handleViewableChanged = useCallback(({ changed }) => {
    setViewable(changed.map(({ item }) => item.id));
  }, []);

  async function loadPage(pageNumber = page, shouldRefresh = false) {
    if (total && pageNumber > total) return;

    setLoading(true);

    const response = await api.get('subscriptions', {
      params: {
        page: pageNumber,
      },
    });
    const totalItems = response.headers['x-total-count'];

    setTotal(Math.ceil(totalItems / 10));
    setSubscriptions(
      shouldRefresh ? response.data : [...subscriptions, ...response.data]
    );
    setPage(pageNumber + 1);
    setLoading(false);
  }

  useEffect(() => {
    if (isFocused) {
      loadPage();
    }
  }, [isFocused]); // eslint-disable-line

  async function refreshList() {
    setRefreshing(true);

    await loadPage(1, true);

    setRefreshing(false);
  }

  async function handleCancelSubscription(subscriptionId) {
    dispatch(cancelSubscriptionRequest(subscriptionId));

    setSubscriptions(
      subscriptions.filter(subscription => subscription.id !== subscriptionId)
    );
  }

  return (
    <Background>
      <StatusBar barStyle="light-content" backgroundColor="#000" />

      <Container>
        <SubscriptionsList
          data={subscriptions}
          keyExtractor={item => String(item.id)}
          onEndReached={() => loadPage()}
          onEndReachedThreshold={0.1}
          onRefresh={refreshList}
          refreshing={refreshing}
          onViewableItemsChanged={handleViewableChanged}
          viewabilityConfig={{ viewAreaCoveragePercentThreshold: 20 }}
          ListFooterComponent={loading && <Loading />}
          ListEmptyComponent={
            !loading &&
            !refreshing && (
              <Empty
                image={
                  <MCIcon
                    name="calendar-remove-outline"
                    size={100}
                    color="#999"
                  />
                }
                title="Você ainda não se inscreveu em nenhum meetup"
                message="Que tal participar de um novo meetup?"
              />
            )
          }
          renderItem={({ item }) => (
            <MeetupCard
              data={item.meetup}
              action="Cancelar inscrição"
              onPress={() => handleCancelSubscription(item.id)}
              visible={viewable.includes(item.id)}
            />
          )}
        />
      </Container>
    </Background>
  );
}

Subscriptions.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(Subscriptions);
