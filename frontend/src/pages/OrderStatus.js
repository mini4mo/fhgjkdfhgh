import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const stages = [
  'Заказ создан',
  'Найден курьер',
  'Курьер забрал заказ',
  'Заказ доставлен'
];

function OrderStatus() {
  const { orderId } = useParams();
  const [stageIndex, setStageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStageIndex(prev => {
        if (prev < stages.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          return prev;
        }
      });
    }, 30000); // 30 секунд

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container">
      <h2>Статус заказа #{orderId}</h2>
      <p className="status-text">{stages[stageIndex]}</p>
    </div>
  );
}

export default OrderStatus;
