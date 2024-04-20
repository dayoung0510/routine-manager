'use client';

import { useState, useEffect } from 'react';
import { useGetUsers } from 'apis/hooks';

export default function Home() {
  const { data } = useGetUsers();

  return <>{data?.map((i) => i.id)}</>;
}
