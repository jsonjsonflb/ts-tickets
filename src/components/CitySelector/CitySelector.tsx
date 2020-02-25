import React, { useState, useMemo, useEffect, memo, useCallback } from 'react';
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

// 锚点组件
interface AlphaIndexProps {
  alpha: string;
  onClick: (props: any) => void;
}
const AlphaIndex = memo((props: AlphaIndexProps) => {
  const { alpha, onClick } = props;
  return (
    <i className={styles.city_index_item} onClick={() => onClick(alpha)}>
      {alpha}
    </i>
  );
});

/**
 * 生成26个字母的数组
 */
const alphabet = Array.from(new Array(26), (ele, index) => {
  return String.fromCharCode(65 + index);
});

/**
 * 列表组件
 */
interface CityListTypes {
  sections: any[];
  [random: string]: any;
}
const CityList = memo(function CityList(props: CityListTypes) {
  const { sections, onSelect, toAlpha } = props;

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
      <div className={styles.city_index}>
        {alphabet.map(item => (
          <AlphaIndex key={item} alpha={item} onClick={toAlpha} />
        ))}
      </div>
    </div>
  );
});

/**
 * 搜索建议选项
 */
// interface SuggestItemProps {
//   name: string;
//   onClick: (props: any) => void;
// }
// const SuggestItem = memo((props: SuggestItemProps) => {
//   const { name, onClick } = props;

//   return (
//     <li className={styles.city_suggest_li} onClick={() => onClick(name)}>
//       {name}
//     </li>
//   );
// });

/**
 * 搜索栏
 */
interface SuggestProps {
  searchKey: string;
  onSelect: (props: any) => void;
}
const Suggest = memo((props: SuggestProps) => {
  const { searchKey, onSelect } = props;

  const [result, setResult] = useState([]);

  useEffect(() => {
    fetch(
      'http://localhost:4444/rest/search?key=' + encodeURIComponent(searchKey)
    )
      .then(res => res.json())
      .then(data => {
        const { result, searchKey: sKey } = data;
        if (sKey === searchKey) {
          setResult(result);
        }
      });
  }, [searchKey]);

  // 过滤结果，
  const fallBackResult = useMemo(() => {
    if (result.length) {
      return result;
    } else {
      return [{ display: searchKey }];
    }
  }, [searchKey, result]);

  return (
    <div className={styles.city_suggest}>
      <ul className={styles.city_suggest_ul}>
        {fallBackResult.map((item: any, index: number) => (
          <li
            key={index}
            className={styles.city_suggest_li}
            onClick={() => onSelect(item.display)}
          >
            {item.display}
          </li>
        ))}
      </ul>
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

  // 跳转至锚点
  const toAlpha = useCallback((alpha: string) => {
    document.querySelector(`[data-cate='${alpha}']`).scrollIntoView();
  }, []);

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
          toAlpha={toAlpha}
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
      {Boolean(key) && (
        <Suggest
          searchKey={searchKey}
          onSelect={key => {
            // 选择城市的回调
            onSelect(key);
          }}
        />
      )}
      {outputCitySections()}
    </div>
  );
}
