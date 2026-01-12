import { type ArticleItemType } from './types';

interface ArticleItemProps {
  item: ArticleItemType;
  index: number;
}

function isTitleItem(item: ArticleItemType): item is {
  title: string;
  subItems?: Array<string | { content: string; subSubItems?: string[] }>;
} {
  return typeof item === 'object' && item !== null && 'title' in item;
}

function isContentItem(item: ArticleItemType): item is { content: string; subItems?: string[] } {
  return typeof item === 'object' && item !== null && 'content' in item && !('title' in item);
}

export function ArticleItem({ item, index }: ArticleItemProps) {
  if (typeof item === 'string') {
    return (
      <p className='text-base leading-6 font-normal text-neutral-700'>
        {index + 1}. {item}
      </p>
    );
  }

  // title과 subItems를 가진 경우 (article6)
  if (isTitleItem(item)) {
    return (
      <div className='flex flex-col gap-2'>
        <p className='text-base leading-6 font-semibold text-neutral-700'>{item.title}</p>
        {item.subItems && (
          <div className='flex flex-col gap-1 pl-4'>
            {item.subItems.map((subItem, subIndex) => {
              if (typeof subItem === 'string') {
                return (
                  <p key={subIndex} className='text-base leading-6 font-normal text-neutral-700'>
                    {subIndex + 1}) {subItem}
                  </p>
                );
              } else if (subItem.content && subItem.subSubItems) {
                return (
                  <div key={subIndex} className='flex flex-col gap-1'>
                    <p className='text-base leading-6 font-normal text-neutral-700'>
                      {subIndex + 1}) {subItem.content}
                    </p>
                    <div className='flex flex-col gap-1 pl-4'>
                      {subItem.subSubItems.map((subSubItem, subSubIndex) => (
                        <p
                          key={subSubIndex}
                          className='text-base leading-6 font-normal text-neutral-700'
                        >
                          {String.fromCharCode(65 + subSubIndex)}. {subSubItem}
                        </p>
                      ))}
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        )}
      </div>
    );
  }

  // content와 subItems를 가진 경우
  if (isContentItem(item)) {
    return (
      <div className='flex flex-col gap-2'>
        <p className='text-base leading-6 font-normal text-neutral-700'>
          {index + 1}. {item.content}
        </p>
        {item.subItems && (
          <div className='flex flex-col gap-1 pl-4'>
            {item.subItems.map((subItem, subIndex) => (
              <p key={subIndex} className='text-base leading-6 font-normal text-neutral-700'>
                {subIndex + 1}) {subItem}
              </p>
            ))}
          </div>
        )}
      </div>
    );
  }

  return null;
}
