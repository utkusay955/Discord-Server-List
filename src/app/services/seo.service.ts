import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface TypingSEO {
  titlePrefix?: string;
  titleSuffix: string;
  description: string;
  url: string;
}
export interface TypingProperty {
  property: string;
  itemprop?: string;
  content: string;
}
export interface TypingName {
  name: string;
  itemprop?: string;
  content: string;
}

@Injectable()
export class SEOService {
  base = {
    titlePrefix: 'Find the Best Discord Servers',
    titleSuffix: 'DList',
    url: 'https://dlist.xyz'
  }

  constructor(
    private ngMeta: Meta,
    private ngTitle: Title
  ) {
    this.keywords('discord guilds, discord guild maker, discord guild commands, discord guild builder, discord guild list');
    this.image('https://dlist.xyz/assets/img/logo.svg');
  }

  get metaInstance() {
    return this.ngMeta;
  }

  setTags(config: TypingSEO) {
    this.title(config.titleSuffix, config.titlePrefix);
    this.description(config.description);
    this.url(config.url);
  }

  private setNameTag(name: TypingName) {
    const property = {
      name: name.name,
      content: name.content,
    };
    if (name.itemprop && name.itemprop !== '')
      property['itemprop'] = name.itemprop;
    if (this.ngMeta.getTag(`name="${property.name}"`))
      this.ngMeta.updateTag(property);
    else
      this.ngMeta.addTag(property);
  }
  
  private setPropertyTag(prop: TypingProperty) {
    const property = {
      property: prop.property,
      content: prop.content,
    };
    if (prop.itemprop !== undefined && prop.itemprop !== '')
      property['itemprop'] = prop.itemprop;
    if (this.ngMeta.getTag(`property="${property.property}"`))
      this.ngMeta.updateTag(property);
    else
      this.ngMeta.addTag(property);
  }

  private url(content: string) {
    this.ngMeta.updateTag({ property: 'og:url', itemprop: 'url', content: `${this.base.url}/${content}` });
  }

  private title(titleSuffix = this.base.titleSuffix, titlePrefix = this.base.titlePrefix) {
    const setTitle = (titleSuffix !== undefined && titleSuffix !== '')
      ? `${titlePrefix} - ${titleSuffix}`
      : titlePrefix;
    this.ngTitle.setTitle(setTitle);
    this.setPropertyTag({ property: 'og:title', itemprop: 'title', content: setTitle });
    this.setPropertyTag({ property: 'twitter:title', itemprop: 'title', content: setTitle });
  }

  private description(content: string) {
    this.setNameTag({ name: 'description', itemprop: 'description', content });
    this.setPropertyTag({ property: 'og:description', itemprop: 'description', content });
    this.setPropertyTag({ property: 'twitter:description', itemprop: 'description', content });
  }

  private image(content: string) {
    this.setPropertyTag({ property: 'twitter:image', itemprop: 'image', content });
    this.setPropertyTag({ property: 'og:image', itemprop: 'image', content });
    this.setPropertyTag({ property: 'og:image:secure_url', itemprop: 'image', content });
  }

  private keywords(content: string) {
    this.setNameTag({ name: 'keywords', itemprop: 'keywords', content });
  }
}