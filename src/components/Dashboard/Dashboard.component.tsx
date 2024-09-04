"use client";

import { useMemo, useState } from "react";
import { DEFAULT_CARD_OPTION } from "../../constants/general.constant";
import useGetCards from "../../hooks/query/useGetCards.hook";
import useGetMetrics from "../../hooks/query/useGetMetrics.hook";
import ActivityComponent from "../Activity/Activity.component";
import AutocompleteInputComponent from "../Common/AutoCompleteInput/AutoCompleteInput.component";
import MetricsComponent from "../Metrics/Metrics.component";

const DashboardComponent = () => {
  const [selectedCard, setSelectedCard] = useState(DEFAULT_CARD_OPTION);
  const [cardQuery, setCardQuery] = useState("");

  const {
    data: metrics,
    isLoading,
    isFetching,
  } = useGetMetrics(selectedCard.value);
  const { data: cards } = useGetCards(cardQuery);

  const cardsOptions = useMemo(() => {
    if (!cards) return [];

    return cards.map((card) => ({
      label: `${card.brand} - ***${card.last4}`,
      value: card.id,
    }));
  }, [cards]);

  const handleOnCardQueryChange = (value: string) => {
    const formattedQuery = value.replace(/\D/g, "").trim();
    if (
      formattedQuery.length === 4 ||
      (formattedQuery.length === 0 && cards?.length === 0)
    ) {
      setCardQuery(formattedQuery);
    }
  };

  return (
    <div className="w-[750px] mx-auto">
      <section className="mb-5">
        <AutocompleteInputComponent
          placeholder="Search by the last 4 digits ..."
          options={cardsOptions}
          selected={selectedCard}
          onSelect={setSelectedCard}
          onChange={handleOnCardQueryChange}
          disabled={isLoading || isFetching}
        />
      </section>
      <section>
        <MetricsComponent
          isLoading={isLoading}
          isFetching={isFetching}
          metrics={metrics}
        />
      </section>
      <section className="pt-10 mt-10">
        <ActivityComponent
          metricsLoaded={!!metrics}
          cardId={selectedCard.value}
        />
      </section>
    </div>
  );
};
export default DashboardComponent;
