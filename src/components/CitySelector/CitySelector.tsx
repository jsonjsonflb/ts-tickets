import React, { useState, useMemo, useEffect, memo } from 'react';
import styles from './CitySelector.scss';
import { helpers } from '@/utils';

/**
 * 城市局域网
 */
interface CityItemTypes {
  name: string;
  onSelect: (p: string) => void;
}
const CityItem = memo(function CityItem(props: CityItemTypes) {
  const { name, onSelect } = props;

  return (
    <li className={styles.city_li} onClick={() => onSelect(name)}>
      {name}
    </li>
  );
});

/**
 * 城市栏
 */
interface CitySectionTypes {
  title: string;
  cities: any[];
  [random: string]: any;
}
const CitySection = memo(function CitySection(props: CitySectionTypes) {
  const { title, cities = [], onSelect } = props;

  return (
    <ul className={styles.city_ul}>
      <li className={styles.city_li} key="title" data-cate={title}>
        {title}
      </li>
      {cities.map(city => {
        return (
          <CityItem key={city.name} name={city.name} onSelect={onSelect} />
        );
      })}
    </ul>
  );
});

/**
 * 列表组件
 */
interface CityListTypes {
  sections: any[];
  [random: string]: any;
}
const CityList = memo(function CityList(props: CityListTypes) {
  const { sections, onSelect } = props;

  return (
    <div className={styles.city_list}>
      <div className={styles.city_cate}>
        {sections.map(section => {
          return (
            <CitySection
              key={section.title}
              title={section.title}
              cities={section.citys}
              onSelect={onSelect}
            />
          );
        })}
      </div>
      <div className={styles.city_index}></div>
    </div>
  );
});

/**
 * 主模块
 */
interface propsTypes {
  show: boolean;
  isLoading: boolean;
  onSelect: (city: any) => void;
  [random: string]: any;
}

export default function CitySelector(props: propsTypes) {
  const { show, cityData, isLoading, onBack, fetchData, onSelect } = props;

  const [searchKey, setSearchKey] = useState('');

  const key = useMemo(() => searchKey.trim(), [searchKey]);

  useEffect(() => {
    if (!show || cityData || isLoading) {
      return;
    }

    if (fetchData) {
      fetchData();
    }
  }, [show, cityData, isLoading, fetchData]);

  // 渲染列表
  const outputCitySections = () => {
    if (isLoading) {
      return <div>loading</div>;
    }

    if (cityData) {
      return (
        <CityList
          sections={cityData.cityList}
          onSelect={onSelect}
          // toAlpha={toAlpha}
        />
      );
    }

    return <div>error</div>;
  };

  return (
    <div
      className={helpers.concatClass(
        styles.city_selector,
        show ? '' : styles.hidden
      )}
    >
      <div className={styles.city_search}>
        <div
          className={styles.search_back}
          onClick={() => {
            if (onBack) {
              onBack();
            }
          }}
        >
          <svg width="42" height="42">
            <polyline
              points="25,13 16,21 25,29"
              stroke="#fff"
              strokeWidth="2"
              fill="none"
            />
          </svg>
        </div>
        <div className={styles.search_input_wrapper}>
          <input
            type="text"
            value={searchKey}
            className={styles.search_input}
            placeholder="城市、车站的中文或拼音"
            onChange={e => setSearchKey(e.target.value)}
          />
        </div>
        <i
          onClick={() => setSearchKey('')}
          className={helpers.concatClass(
            styles.search_clean,
            key.length === 0 ? styles.hidden : ''
          )}
        >
          &#xf063;
        </i>
      </div>
      {outputCitySections()}
    </div>
  );
}
