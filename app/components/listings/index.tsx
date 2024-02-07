import React, { useEffect, useRef, useState } from "react";
import { FlashList } from "@shopify/flash-list";
import { ListingItem } from "@/interfaces/listing";
import ListCard from "../ticketCard/_layout";

interface props {
  listings: any[];
  category: string;
}

const Listings = ({ listings: items, category }: props) => {
  const [loading, setLoading] = useState(false);
  const listRef = useRef<FlashList<ListingItem>>(null);

  useEffect(() => {
    console.log("Reload Listing: ", items.length);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 200);
  }, [category]);

  const renderRow = ({ item }: { item: ListingItem }) => (
    <ListCard item={item} />
  );

  return (
    <>
      <FlashList
        data={loading ? [] : items}
        renderItem={renderRow}
        ref={listRef}
        estimatedItemSize={100}
        keyExtractor={(item) => item.id}
      />
    </>
  );
};

export default Listings;
