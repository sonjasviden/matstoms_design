import { CollectionReference, getDocs } from "firebase/firestore";
import { useState, useEffect, useCallback } from "react";

const useGetCollection = <T>(refCol: CollectionReference<T>) => {
  const [data, setData] = useState<T[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getData = useCallback(async () => {
    setIsLoading(true);

    const snapshot = await getDocs(refCol);

    const data: T[] = snapshot.docs.map((doc) => {
      return {
        ...doc.data(),
        _id: doc.id,
      };
    });

    setData(data);
    setIsLoading(false);
  }, [refCol]);

  useEffect(() => {
    getData();
  }, [getData]);

  return {
    data,
    getData,
    isLoading,
    setIsLoading,
  };
};

export default useGetCollection;
