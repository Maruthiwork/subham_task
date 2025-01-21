
//@ts-nocheck
export const TEMPLATE = {
    STORY_CARD: 'STORY_CARD',
    STORY_CARD_LISTING: 'STORY_CARD_LISTING',
    STORY_CARD_LISTING_IN_PICTURE: 'STORY_CARD_LISTING_IN_PICTURE',
    CUSTOM_STORY_CARD: 'CUSTOM_STORY_CARD',
    ELECTION_KEY_DATES: 'ELECTION_KEY_DATES',
    ELECTION_KEY_CANDIDATES: 'ELECTION_KEY_CANDIDATES',
    SWIPER_CARD: 'SWIPER',
    SWIPER_IN_PICTURE_CARD: 'SWIPER_IN_PICTURE',
    LIVE_BLOG: 'LIVE_BLOG',
    LIVE_TV: 'LIVE_TV',
    ADS_CARD: 'ADS_CARD',
    VIDEO_CENTER: 'VIDEO_CENTER',
    POLL_CARD: 'POLL_CARD',
    SHORTCODE: 'SHORTCODE',
    FAQ: 'FAQ',
    GRID: 'GRID',
    EMBED: 'EMBED',
    GAINERS_AND_LOSERS: 'GAINERS_AND_LOSERS',
    MARKETS: 'MARKETS',
    HIDDEN: 'HIDDEN',
    DEFAULT: 'DEFAULT',
    SEO_FOOTER: 'SEO_FOOTER',
    HTMLCONTENT : 'HTMLCONTENT'
}

export const TEMPLATE_PROPERTIES = {
    DEFAULT: {
        key: TEMPLATE.DEFAULT,
        type: {
            BANNER: 'BANNER'
        }
    },
    HTMLCONTENT: {
        key: TEMPLATE.HTMLCONTENT,
        type: {
            DEFAULT: 'DEFAULT'
        }
    },
    STORY_CARD: {
        key: TEMPLATE.STORY_CARD,
        type: {
            DEFAULT: 'DEFAULT',
            EQUALDEFAULT: 'EQUALDEFAULT',
            BIG: 'BIG',
            BIGNOIMAGE: 'BIGNOIMAGE',
            BIGFLIP: 'BIGFLIP',
            MEDIUM: 'MEDIUM',
            NOIMAGE: 'NOIMAGE',
            FLIP: 'FLIP',
            ANCHOR_STORY: 'ANCHOR_STORY',
            ANCHOR_STORY_FLIP: 'ANCHOR_STORY_FLIP',
            '4_3': '4_3',
            FLIP_4_3: 'FLIP_4_3'
        }
    },
    SWIPER_CARD: {
        key: TEMPLATE.SWIPER_CARD,
        type: {
            DEFAULT: 'DEFAULT',
            16_9: '16_9',
            9_16: '9_16',
            1_1: '1_1',
            3_4: '3_4',
            4_3: '4_3',
            ANCHOR_STORY: 'ANCHOR_STORY',
            ANCHOR_STORY_FLIP: 'ANCHOR_STORY_FLIP',
        }
    },
    SWIPER_IN_PICTURE_CARD: {
        key: TEMPLATE.SWIPER_IN_PICTURE_CARD,
        type: {
            DEFAULT: 'DEFAULT',
            16_9: '16_9',
            9_16: '9_16',
            1_1: '1_1',
            3_4: '3_4'
        }
    },
    LIVE_BLOG: {
        key: TEMPLATE.LIVE_BLOG,
        type: {
            DEFAULT: 'DEFAULT',
            LIVEUPDATE: 'LIVEUPDATE'
        }
    },
    LIVE_TV: {
        key: TEMPLATE.LIVE_TV,
        type: {
            DEFAULT: 'DEFAULT',

        }
    },
    ADS_CARD: {
        key: TEMPLATE.ADS_CARD,
        type: {
            DEFAULT: 'DEFAULT',
            STICKY_ADS: 'STICKY_ADS',
            VDO_ADS: 'VDO_ADS',
        }
    },
    VIDEO_CENTER: {
        key: TEMPLATE.VIDEO_CENTER,
        type: {
            DEFAULT: 'DEFAULT',
            '4_3': "4_3"
        }
    },
    POLL_CARD: {
        key: TEMPLATE.POLL_CARD,
        type: {
            DEFAULT: 'DEFAULT',

        }
    },
    SHORTCODE: {
        key: TEMPLATE.SHORTCODE,
        type: {
            DEFAULT: 'DEFAULT',

        }
    },
    FAQ: {
        key: TEMPLATE.FAQ,
        type: {
            DEFAULT: 'DEFAULT',

        }
    },
    GRID: {
        key: TEMPLATE.GRID,
        type: {
            DEFAULT: 'DEFAULT',

        }
    }
}

export const STYLE_PROPERTIES_BUISINESS = {
    'STORY_CARD': {
        'DEFAULT': {
            fontStyle: {
                'desktop': {
                    1: {
                        1: `font-size: 18px;font-weight: 500;line-height: 140%;letter-spacing: -0.36px;`,
                        2: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`,
                        3: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`,
                        4: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`,
                        5: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`
                    },
                    2: {
                        1: `font-size: 24px;font-weight: 700;line-height: 120%;letter-spacing: -0.72px;text-transform: capitalize;`,
                        2: `font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;height:fit-content`,
                        3: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`,
                        4: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`,
                        5: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`
                    }
                },
                'mobile': {
                    1: {
                        1: `font-size: 16px;font-weight: 600;line-height: 130%;letter-spacing: -0.32px;`
                    }
                }
            }
        },
        'EQUALDEFAULT': {
            fontStyle: {
                'desktop': {
                    1: {
                        1: `font-size: 18px;font-weight: 500;line-height: 140%;letter-spacing: -0.36px;`,
                        2: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`,
                        3: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`,
                        4: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`,
                        5: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`
                    },
                    2: {
                        1: `font-size: 24px;font-weight: 700;line-height: 120%;letter-spacing: -0.72px;text-transform: capitalize;`,
                        2: `font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;height:fit-content`,
                        3: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`,
                        4: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`,
                        5: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`
                    }
                },
                'mobile': {
                    1: {
                        1: `font-size: 16px;font-weight: 600;line-height: 130%;letter-spacing: -0.32px;`
                    }
                }
            }
        },
        'FLIP': {
            fontStyle: {
                'desktop': {
                    1: {
                        1: `font-size: 18px;font-weight: 600;line-height: 120%; letter-spacing: -0.36px;text-transform: capitalize;`,
                        2: `font-size: 20px;font-weight: 700;line-height: 120%;letter-spacing: -0.4px;height:fit-content`,
                        3: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`,
                        4: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`,
                        5: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`
                    },
                    2: {
                        1: `font-size: 24px;font-weight: 700;line-height: 130%;letter-spacing: -0.72px;`,
                        2: `font-size: 20px;font-weight: 700;line-height: 120%;letter-spacing: -0.4px;height:fit-content`,
                        3: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`,
                        4: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`,
                        5: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`
                    }
                },
                'mobile': {
                    1: {
                        1: `font-size: 16px;font-weight: 600;line-height: 130%;letter-spacing: -0.32px;`
                    }
                }
            }
        },
        'FLIP_4_3': {
            fontStyle: {
                'desktop': {
                    1: {
                        1: `font-size: 18px;font-weight: 600;line-height: 120%; letter-spacing: -0.36px;text-transform: capitalize;`,
                        2: `font-size: 20px;font-weight: 700;line-height: 120%;letter-spacing: -0.4px;height:fit-content`,
                        3: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`,
                        4: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`,
                        5: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`
                    },
                    2: {
                        1: `font-size: 24px;font-weight: 700;line-height: 130%;letter-spacing: -0.72px;`,
                        2: `font-size: 20px;font-weight: 700;line-height: 120%;letter-spacing: -0.4px;height:fit-content`,
                        3: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`,
                        4: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`,
                        5: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`
                    }
                },
                'mobile': {
                    1: {
                        1: `font-size: 16px;font-weight: 500;line-height: 130%;letter-spacing: -0.32px;`
                    }
                }
            }
        },
        'BIG': {
            fontStyle: {
                'desktop': {
                    1: {
                        1: `font-size: 28px;font-weight: 900;line-height: 130%;letter-spacing: -1.12px;`,
                        2: `font-size: 28px;font-weight: 900;line-height: 130%;letter-spacing: -1.12px;`,
                        3: `font-size: 28px;font-weight: 900;line-height: 130%;letter-spacing: -1.12px;`,
                        4: `font-size: 28px;font-weight: 900;line-height: 130%;letter-spacing: -1.12px;`,
                        5: `font-size: 28px;font-weight: 900;line-height: 130%;letter-spacing: -1.12px;`
                    },
                    2: {
                        1: `font-size: 28px;font-weight: 900;line-height: 130%;letter-spacing:-0.56px`,
                        2: `font-size: 28px;font-weight: 900;line-height: 130%;letter-spacing:-0.56px`,
                        3: `font-size: 28px;font-weight: 900;line-height: 130%;letter-spacing:-0.56px`,
                        4: `font-size: 28px;font-weight: 900;line-height: 130%;letter-spacing:-0.56px`,
                        5: `font-size: 28px;font-weight: 900;line-height: 130%;letter-spacing:-0.56px`
                    }
                },
                'mobile': {
                    1: {
                        1: `font-size: 24px;font-weight: 700;line-height: 120%;letter-spacing: -0.72px;`
                    }
                }
            }
        },
        'MEDIUM': {
            fontStyle: {
                'desktop': {
                    1: {
                        1: `font-size: 24px;font-weight: 700;line-height: 130%;letter-spacing: -0.72px;height:fit-content`,
                        2: `font-size: 24px;font-weight: 700;line-height: 130%;letter-spacing: -0.72px;height:fit-content`,
                        3: `font-size: 24px;font-weight: 700;line-height: 130%;letter-spacing: -0.72px;height:fit-content`,
                        4: `font-size: 24px;font-weight: 700;line-height: 130%;letter-spacing: -0.72px;height:fit-content`,
                        5: `font-size: 18px;font-weight: 500;line-height: 135%;letter-spacing: -0.36px;`
                    },
                    2: {
                        1: `font-size: 24px;font-weight: 700;line-height: 130%;letter-spacing: -0.72px;height:fit-content`,
                        2: `font-size: 24px;font-weight: 700;line-height: 130%;letter-spacing: -0.72px;height:fit-content`,
                        3: `font-size: 24px;font-weight: 700;line-height: 130%;letter-spacing: -0.72px;height:fit-content`,
                        4: `font-size: 24px;font-weight: 700;line-height: 130%;letter-spacing: -0.72px;height:fit-content`,
                        5: `font-size: 18px;font-weight: 500;line-height: 135%;letter-spacing: -0.36px;`
                    }
                },
                'mobile': {
                    1: {
                        1: `font-size: 20px;font-weight: 700;line-height: 130%;letter-spacing: -0.4px;`
                    }
                }
            }
        },
        'NOIMAGE': {
            fontStyle: {
                'desktop': {
                    1: {
                        1: `font-size: 22px;font-weight: 700;line-height: 135%;letter-spacing: -0.66px;height:fit-content`,
                        2: `font-size: 22px;font-weight: 700;line-height: 135%;letter-spacing: -0.66px;height:fit-content`,
                        3: `font-size: 22px;font-weight: 700;line-height: 135%;letter-spacing: -0.66px;height:fit-content`,
                        4: `font-size: 22px;font-weight: 700;line-height: 135%;letter-spacing: -0.66px;height:fit-content`,
                        5: `font-size: 22px;font-weight: 700;line-height: 135%;letter-spacing: -0.66px;height:fit-content`
                    },
                    2: {
                        1: `font-size: 18px;font-weight: 500;line-height: 135%;letter-spacing: -0.66px;height:fit-content`,
                        2: `font-size: 22px;font-weight: 700;line-height: 135%;letter-spacing: -0.66px;height:fit-content`,
                        3: `font-size: 22px;font-weight: 700;line-height: 135%;letter-spacing: -0.66px;height:fit-content`,
                        4: `font-size: 22px;font-weight: 700;line-height: 135%;letter-spacing: -0.66px;height:fit-content`,
                        5: `font-size: 22px;font-weight: 700;line-height: 135%;letter-spacing: -0.66px;height:fit-content`
                    }
                },
                'mobile': {
                    1: {
                        1: `font-size: 16px;font-weight: 600;line-height: 130%;letter-spacing: -0.32px;`
                    }
                }
            }
        },
        '3_4': {
            fontStyle: {
                'desktop': {
                    1: {
                        1: `font-size: 18px;font-weight: 600;line-height: 130%;`,
                        2: `font-size: 18px;font-weight: 600;line-height: 130%;`,
                        3: `font-size: 18px;font-weight: 600;line-height: 130%;`,
                        4: `font-size: 18px;font-weight: 600;line-height: 130%;`,
                        5: `font-size: 18px;font-weight: 600;line-height: 130%;`
                    },
                    2: {
                        1: `font-size: 18px;font-weight: 600;line-height: 130%;`,
                        2: `font-size: 18px;font-weight: 600;line-height: 130%;`,
                        3: `font-size: 18px;font-weight: 600;line-height: 130%;`,
                        4: `font-size: 18px;font-weight: 600;line-height: 130%;`,
                        5: `font-size: 18px;font-weight: 600;line-height: 130%;`
                    }
                },
                'mobile': {
                    1: {
                        1: `font-size: 16px;font-weight: 500;line-height: 130%;letter-spacing: -0.32px;`
                    }
                }
            }
        },
        '4_3': {
            fontStyle: {
                'desktop': {
                    1: {
                        1: `font-size: 18px;font-weight: 600;line-height: 120%;letter-spacing: -0.72px;`,
                        2: `font-size: 24px;font-weight: 700;line-height: 120%;letter-spacing: -0.72px;text-transform: capitalize;`,
                        3: `font-size: 24px;font-weight: 700;line-height: 120%;letter-spacing: -0.72px;text-transform: capitalize;`,
                        4: `font-size: 24px;font-weight: 700;line-height: 120%;letter-spacing: -0.72px;text-transform: capitalize;`,
                        5: `font-size: 24px;font-weight: 700;line-height: 120%;letter-spacing: -0.72px;text-transform: capitalize;`
                    },
                    2: {
                        1: `font-size: 18px;font-weight: 600;line-height: 120%;letter-spacing: -0.72px;`,
                        2: `font-size: 24px;font-weight: 700;line-height: 120%;letter-spacing: -0.72px;text-transform: capitalize;`,
                        3: `font-size: 24px;font-weight: 700;line-height: 120%;letter-spacing: -0.72px;text-transform: capitalize;`,
                        4: `font-size: 24px;font-weight: 700;line-height: 120%;letter-spacing: -0.72px;text-transform: capitalize;`,
                        5: `font-size: 24px;font-weight: 700;line-height: 120%;letter-spacing: -0.72px;text-transform: capitalize;`
                    }
                },
                'mobile': {
                    1: {
                        1: `font-size: 20px;font-weight: 700;line-height: 130%;letter-spacing: -0.4px;`
                    }
                }
            }
        },
        '16_9': {
            fontStyle: {
                'desktop': {
                    1: {
                        1: `font-size: 20px;font-weight: 700;line-height: 140%;letter-spacing: -0.96px;`,
                        2: `font-size: 24px;font-weight: 700;line-height: 140%;letter-spacing: -0.96px;`,
                        3: `font-size: 24px;font-weight: 700;line-height: 120%;letter-spacing: -0.72px;text-transform: capitalize;`,
                        4: `font-size: 24px;font-weight: 700;line-height: 140%;letter-spacing: -0.96px;`,
                        5: `font-size: 24px;font-weight: 700;line-height: 140%;letter-spacing: -0.96px;`
                    },
                    2: {
                        1: `font-size: 20px;font-weight: 700;line-height: 140%;letter-spacing: -0.96px;`,
                        2: `font-size: 24px;font-weight: 700;line-height: 140%;letter-spacing: -0.96px;`,
                        3: `font-size: 24px;font-weight: 700;line-height: 120%;letter-spacing: -0.72px;text-transform: capitalize;`,
                        4: `font-size: 24px;font-weight: 700;line-height: 140%;letter-spacing: -0.96px;`,
                        5: `font-size: 24px;font-weight: 700;line-height: 140%;letter-spacing: -0.96px;`
                    }
                },
                'mobile': {
                    1: { 1: `font-size: 24px;font-weight: 700;line-height: 120%;letter-spacing: -0.72px;` }
                }
            }
        },
    },
    'SWIPER': {
        'DEFAULT': {
            fontStyle: {
                'desktop': {
                    1: {
                        1: `font-size: 17px;font-style: normal;font-weight: 600;line-height: 130%;`,
                        2: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`,
                        3: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`,
                        4: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`,
                        5: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`
                    },
                    2: {
                        1: `font-size: 17px;font-style: normal;font-weight: 600;line-height: 130%;`,
                        2: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`,
                        3: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`,
                        4: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`,
                        5: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`
                    }
                },
                'mobile': {
                    1: { 1: `font-size: 16px;font-weight: 600;line-height: 130%;letter-spacing: -0.32px;` }
                }
            }
        },
        'FLIP': {
            fontStyle: {
                'desktop': {
                    1: {
                        1: `font-size: 24px;font-weight: 700;line-height: 130%;letter-spacing: -0.72px;`,
                        2: `font-size: 20px;font-weight: 700;line-height: 120%;letter-spacing: -0.4px;height:fit-content`,
                        3: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`,
                        4: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`,
                        5: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`
                    },
                    2: {
                        1: `font-size: 24px;font-weight: 700;line-height: 130%;letter-spacing: -0.72px;`,
                        2: `font-size: 20px;font-weight: 700;line-height: 120%;letter-spacing: -0.4px;height:fit-content`,
                        3: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`,
                        4: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`,
                        5: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`
                    }
                },
                'mobile': {
                    1: { 1: `font-size: 16px;font-weight: 600;line-height: 130%;letter-spacing: -0.32px;` }
                }
            }
        },
        'BIG': {
            fontStyle: {
                'desktop': {
                    1: {
                        1: `font-size: 28px;font-weight: 900;line-height: 130%;letter-spacing: -1.12px;`,
                        2: `font-size: 28px;font-weight: 900;line-height: 130%;letter-spacing: -1.12px;`,
                        3: `font-size: 28px;font-weight: 900;line-height: 130%;letter-spacing: -1.12px;`,
                        4: `font-size: 28px;font-weight: 900;line-height: 130%;letter-spacing: -1.12px;`,
                        5: `font-size: 28px;font-weight: 900;line-height: 130%;letter-spacing: -1.12px;`
                    },
                    2: {
                        1: `font-size: 28px;font-weight: 900;line-height: 130%;letter-spacing: -1.12px;`,
                        2: `font-size: 28px;font-weight: 900;line-height: 130%;letter-spacing: -1.12px;`,
                        3: `font-size: 28px;font-weight: 900;line-height: 130%;letter-spacing: -1.12px;`,
                        4: `font-size: 28px;font-weight: 900;line-height: 130%;letter-spacing: -1.12px;`,
                        5: `font-size: 28px;font-weight: 900;line-height: 130%;letter-spacing: -1.12px;`
                    }
                },
                'mobile': {
                    1: { 1: `font-size: 24px;font-weight: 700;line-height: 120%;letter-spacing: -0.72px;` }
                }
            }
        },
        'MEDIUM': {
            fontStyle: {
                'desktop': {
                    1: {
                        1: `font-size: 24px;font-weight: 700;line-height: 130%;letter-spacing: -0.72px;height:fit-content`,
                        2: `font-size: 24px;font-weight: 700;line-height: 130%;letter-spacing: -0.72px;height:fit-content`,
                        3: `font-size: 24px;font-weight: 700;line-height: 120%;letter-spacing: -0.72px;text-transform: capitalize;height:fit-content`,
                        4: `font-size: 24px;font-weight: 700;line-height: 130%;letter-spacing: -0.72px;height:fit-content`,
                        5: `font-size: 18px;font-weight: 500;line-height: 135%;letter-spacing: -0.36px;`
                    },
                    2: {
                        1: `font-size: 24px;font-weight: 700;line-height: 130%;letter-spacing: -0.72px;height:fit-content`,
                        2: `font-size: 24px;font-weight: 700;line-height: 130%;letter-spacing: -0.72px;height:fit-content`,
                        3: `font-size: 24px;font-weight: 700;line-height: 130%;letter-spacing: -0.72px;height:fit-content`,
                        4: `font-size: 24px;font-weight: 700;line-height: 130%;letter-spacing: -0.72px;height:fit-content`,
                        5: `font-size: 18px;font-weight: 500;line-height: 135%;letter-spacing: -0.36px;`
                    }
                },
                'mobile': {
                    1: {
                        1: `font-size: 24px;font-weight: 700;line-height: 130%;letter-spacing: -0.48px;`
                    }
                }
            }
        },
        'NOIMAGE': {
            fontStyle: {
                'desktop': {
                    1: {
                        1: `font-size: 22px;font-weight: 700;line-height: 135%;letter-spacing: -0.66px;height:fit-content`,
                        2: `font-size: 22px;font-weight: 700;line-height: 135%;letter-spacing: -0.66px;height:fit-content`,
                        3: `font-size: 22px;font-weight: 700;line-height: 135%;letter-spacing: -0.66px;height:fit-content`,
                        4: `font-size: 22px;font-weight: 700;line-height: 135%;letter-spacing: -0.66px;height:fit-content`,
                        5: `font-size: 22px;font-weight: 700;line-height: 135%;letter-spacing: -0.66px;height:fit-content`
                    },
                    2: {
                        1: `font-size: 22px;font-weight: 700;line-height: 135%;letter-spacing: -0.66px;height:fit-content`,
                        2: `font-size: 22px;font-weight: 700;line-height: 135%;letter-spacing: -0.66px;height:fit-content`,
                        3: `font-size: 22px;font-weight: 700;line-height: 135%;letter-spacing: -0.66px;height:fit-content`,
                        4: `font-size: 22px;font-weight: 700;line-height: 135%;letter-spacing: -0.66px;height:fit-content`,
                        5: `font-size: 22px;font-weight: 700;line-height: 135%;letter-spacing: -0.66px;height:fit-content`
                    }
                },
                'mobile': {
                    1: { 1: `font-size: 16px;font-weight: 600;line-height: 130%;letter-spacing: -0.32px;` }
                }
            }
        },
        '3_4': {
            fontStyle: {
                'desktop': {
                    1: {
                        1: `font-size: 18px;font-weight: 600;line-height: 130%;`,
                        2: `font-size: 18px;font-weight: 600;line-height: 130%;`,
                        3: `font-size: 18px;font-weight: 600;line-height: 130%;`,
                        4: `font-size: 18px;font-weight: 600;line-height: 130%;`,
                        5: `font-size: 18px;font-weight: 600;line-height: 130%;`
                    },
                    2: {
                        1: `font-size: 18px;font-weight: 600;line-height: 130%;`,
                        2: `font-size: 18px;font-weight: 600;line-height: 130%;`,
                        3: `font-size: 18px;font-weight: 600;line-height: 130%;`,
                        4: `font-size: 18px;font-weight: 600;line-height: 130%;`,
                        5: `font-size: 18px;font-weight: 600;line-height: 130%;`
                    }
                },
                'mobile': {
                    1: { 1: `font-size: 16px;font-weight: 500;line-height: 130%;letter-spacing: -0.32px;` }
                }
            }
        },
        '4_3': {
            fontStyle: {
                'desktop': {
                    1: {
                        1: `font-size: 24px;font-weight: 800;line-height: 120%;letter-spacing: -0.72px;`,
                        2: `font-size: 24px;font-weight: 700;line-height: 120%;letter-spacing: -0.72px;text-transform: capitalize;`,
                        3: `font-size: 24px;font-weight: 700;line-height: 120%; /* 28.8px */letter-spacing: -0.72px;text-transform: capitalize;`,
                        4: `font-size: 24px;font-weight: 700;line-height: 120%;letter-spacing: -0.72px;text-transform: capitalize;`,
                        5: `font-size: 24px;font-weight: 700;line-height: 120%;letter-spacing: -0.72px;text-transform: capitalize;`
                    },
                    2: {
                        1: `font-size: 18px;font-weight: 600;line-height: 120%;letter-spacing: -0.72px;`,
                        2: `font-size: 24px;font-weight: 700;line-height: 120%;letter-spacing: -0.72px;text-transform: capitalize;`,
                        3: `font-size: 24px;font-weight: 700;line-height: 120%;letter-spacing: -0.72px;text-transform: capitalize;`,
                        4: `font-size: 24px;font-weight: 700;line-height: 120%;letter-spacing: -0.72px;text-transform: capitalize;`,
                        5: `font-size: 24px;font-weight: 700;line-height: 120%;letter-spacing: -0.72px;text-transform: capitalize;`
                    }
                },
                'mobile': {
                    1: { 1: `font-size: 20px;font-weight: 700;line-height: 130%;letter-spacing: -0.4px;` }
                }
            }
        },
        '16_9': {
            fontStyle: {
                'desktop': {
                    1: {
                        1: `font-size: 20px;font-weight: 700;line-height: 140%;letter-spacing: -0.96px;`,
                        2: `font-size: 24px;font-weight: 700;line-height: 140%;letter-spacing: -0.96px;`,
                        3: `font-size: 24px;font-weight: 700;line-height: 120%;letter-spacing: -0.72px;text-transform: capitalize;`,
                        4: `font-size: 24px;font-weight: 700;line-height: 140%;letter-spacing: -0.96px;`,
                        5: `font-size: 24px;font-weight: 700;line-height: 140%;letter-spacing: -0.96px;`
                    },
                    2: {
                        1: `font-size: 20px;font-weight: 700;line-height: 140%;letter-spacing: -0.96px;`,
                        2: `font-size: 24px;font-weight: 700;line-height: 140%;letter-spacing: -0.96px;`,
                        3: `font-size: 24px;font-weight: 700;line-height: 120%;letter-spacing: -0.72px;text-transform: capitalize;`,
                        4: `font-size: 24px;font-weight: 700;line-height: 140%;letter-spacing: -0.96px;`,
                        5: `font-size: 24px;font-weight: 700;line-height: 140%;letter-spacing: -0.96px;`
                    }
                },
                'mobile': {
                    1: { 1: `font-size: 20px;font-weight: 700;line-height: 130%;letter-spacing: -0.4px;` }
                }
            }
        },
    },
}

export const STYLE_PROPERTIES_ENGLISH = {
    'STORY_CARD': {
        'DEFAULT': {
            fontStyle: {
                'desktop': {
                    1: {
                        1: `font-size: 18px;font-weight: 600;line-height: 140%;`,
                        2: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`,
                        3: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`,
                        4: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`,
                        5: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`
                    },
                    2: {
                        1: `font-size: 18px;font-weight: 600;line-height: 140%;`,
                        2: `font-size: 17px;font-weight: 500;line-height: 130%;height:fit-content`,
                        3: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`,
                        4: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`,
                        5: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`
                    }
                },
                'mobile': {
                    1: {
                        1: `font-size: 16px;font-weight: 600;line-height: 130%;letter-spacing: -0.32px;`
                    }
                }
            }
        },
        'EQUALDEFAULT': {
            fontStyle: {
                'desktop': {
                    1: {
                        1: `font-size: 18px;font-weight: 600;line-height: 140%;`,
                        2: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`,
                        3: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`,
                        4: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`,
                        5: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`
                    },
                    2: {
                        1: `font-size: 18px;font-weight: 600;line-height: 140%;`,
                        2: `font-size: 17px;font-weight: 500;line-height: 130%;height:fit-content`,
                        3: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`,
                        4: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`,
                        5: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`
                    }
                },
                'mobile': {
                    1: {
                        1: `font-size: 16px;font-weight: 600;line-height: 130%;letter-spacing: -0.32px;`
                    }
                }
            }
        },
        'FLIP': {
            fontStyle: {
                'desktop': {
                    1: {
                        1: `font-size: 17px;font-weight: 500;line-height: 130%;text-transform: capitalize;`,
                        2: `font-size: 20px;font-weight: 700;line-height: 120%;letter-spacing: -0.4px;height:fit-content`,
                        3: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`,
                        4: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`,
                        5: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`
                    },
                    2: {
                        1: `font-size: 18px;font-weight: 600;line-height: 140%;`,
                        2: `font-size: 20px;font-weight: 700;line-height: 120%;letter-spacing: -0.4px;height:fit-content`,
                        3: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`,
                        4: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`,
                        5: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`
                    }
                },
                'mobile': {
                    1: {
                        1: `font-size: 16px;font-weight: 600;line-height: 130%;letter-spacing: -0.32px;`
                    }
                }
            }
        },
        'BIG': {
            fontStyle: {
                'desktop': {
                    1: {
                        1: `font-size: 24px;font-weight: 800;line-height: 120%;letter-spacing: -0.96px;`,
                        2: `font-size: 28px;font-weight: 900;line-height: 130%;letter-spacing: -1.12px;`,
                        3: `font-size: 28px;font-weight: 900;line-height: 130%;letter-spacing: -1.12px;`,
                        4: `font-size: 28px;font-weight: 900;line-height: 130%;letter-spacing: -1.12px;`,
                        5: `font-size: 28px;font-weight: 900;line-height: 130%;letter-spacing: -1.12px;`
                    },
                    2: {
                        1: `font-size: 28px;font-weight: 900;line-height: 130%;letter-spacing: -1.12px;`,
                        2: `font-size: 28px;font-weight: 900;line-height: 130%;letter-spacing: -1.12px;`,
                        3: `font-size: 28px;font-weight: 900;line-height: 130%;letter-spacing: -1.12px;`,
                        4: `font-size: 28px;font-weight: 900;line-height: 130%;letter-spacing: -1.12px;`,
                        5: `font-size: 28px;font-weight: 900;line-height: 130%;letter-spacing: -1.12px;`
                    }
                },
                'mobile': {
                    1: {
                        1: `font-size: 24px;font-weight: 900;line-height: 120%;letter-spacing: -0.72px;`
                    }
                }
            }
        },
        'MEDIUM': {
            fontStyle: {
                'desktop': {
                    1: {
                        1: `font-size: 18px;font-weight: 600;line-height: 140%;letter-spacing: -0.72px;`,
                        2: `font-size: 24px;font-weight: 700;line-height: 130%;letter-spacing: -0.72px;height:fit-content`,
                        3: `font-size: 24px;font-weight: 800;line-height: 140%;letter-spacing: -0.96px;height:fit-content`,
                        4: `font-size: 24px;font-weight: 700;line-height: 130%;letter-spacing: -0.72px;height:fit-content`,
                        5: `font-size: 18px;font-weight: 500;line-height: 135%;letter-spacing: -0.36px;`
                    },
                    2: {
                        1: `font-size: 24px;font-weight: 700;line-height: 130%;letter-spacing: -0.72px;height:fit-content`,
                        2: `font-size: 24px;font-weight: 700;line-height: 130%;letter-spacing: -0.72px;height:fit-content`,
                        3: `font-size: 24px;font-weight: 700;line-height: 130%;letter-spacing: -0.72px;height:fit-content`,
                        4: `font-size: 24px;font-weight: 700;line-height: 130%;letter-spacing: -0.72px;height:fit-content`,
                        5: `font-size: 18px;font-weight: 500;line-height: 135%;letter-spacing: -0.36px;`
                    }
                },
                'mobile': {
                    1: {
                        1: `font-size: 20px;font-weight: 700;line-height: 130%;letter-spacing: -0.4px;`
                    }
                }
            }
        },
        'NOIMAGE': {
            fontStyle: {
                'desktop': {
                    1: {
                        1: `font-size: 17px;font-weight: 600;line-height: 130%;height:fit-content`,
                        2: `font-size: 22px;font-weight: 700;line-height: 135%;letter-spacing: -0.66px;height:fit-content`,
                        3: `font-size: 22px;font-weight: 700;line-height: 135%;letter-spacing: -0.66px;height:fit-content`,
                        4: `font-size: 22px;font-weight: 700;line-height: 135%;letter-spacing: -0.66px;height:fit-content`,
                        5: `font-size: 22px;font-weight: 700;line-height: 135%;letter-spacing: -0.66px;height:fit-content`
                    },
                    2: {
                        1: `font-size: 22px;font-weight: 700;line-height: 135%;letter-spacing: -0.66px;height:fit-content`,
                        2: `font-size: 22px;font-weight: 700;line-height: 135%;letter-spacing: -0.66px;height:fit-content`,
                        3: `font-size: 22px;font-weight: 700;line-height: 135%;letter-spacing: -0.66px;height:fit-content`,
                        4: `font-size: 22px;font-weight: 700;line-height: 135%;letter-spacing: -0.66px;height:fit-content`,
                        5: `font-size: 22px;font-weight: 700;line-height: 135%;letter-spacing: -0.66px;height:fit-content`
                    }
                },
                'mobile': {
                    1: {
                        1: `font-size: 16px;font-weight: 600;line-height: 130%;letter-spacing: -0.32px;`
                    }
                }
            }
        },
        '3_4': {
            fontStyle: {
                'desktop': {
                    1: {
                        1: `font-size: 18px;font-weight: 600;line-height: 130%;`,
                        2: `font-size: 18px;font-weight: 600;line-height: 130%;`,
                        3: `font-size: 18px;font-weight: 600;line-height: 130%;`,
                        4: `font-size: 18px;font-weight: 600;line-height: 130%;`,
                        5: `font-size: 18px;font-weight: 600;line-height: 130%;`
                    },
                    2: {
                        1: `font-size: 18px;font-weight: 600;line-height: 130%;`,
                        2: `font-size: 18px;font-weight: 600;line-height: 130%;`,
                        3: `font-size: 18px;font-weight: 600;line-height: 130%;`,
                        4: `font-size: 18px;font-weight: 600;line-height: 130%;`,
                        5: `font-size: 18px;font-weight: 600;line-height: 130%;`
                    }
                },
                'mobile': {
                    1: {
                        1: `font-size: 16px;font-weight: 500;line-height: 130%;letter-spacing: -0.32px;`
                    }
                }
            }
        },
        '4_3': {
            fontStyle: {
                'desktop': {
                    1: {
                        1: `font-size: 18px;font-weight: 600;line-height: 120%;letter-spacing: -0.72px;`,
                        2: `font-size: 24px;font-weight: 700;line-height: 120%;letter-spacing: -0.72px;text-transform: capitalize;`,
                        3: `font-size: 24px;font-weight: 700;line-height: 120%;letter-spacing: -0.72px;text-transform: capitalize;`,
                        4: `font-size: 24px;font-weight: 700;line-height: 120%;letter-spacing: -0.72px;text-transform: capitalize;`,
                        5: `font-size: 24px;font-weight: 700;line-height: 120%;letter-spacing: -0.72px;text-transform: capitalize;`
                    },
                    2: {
                        1: `font-size: 18px;font-weight: 600;line-height: 120%;letter-spacing: -0.72px;`,
                        2: `font-size: 24px;font-weight: 700;line-height: 120%;letter-spacing: -0.72px;text-transform: capitalize;`,
                        3: `font-size: 24px;font-weight: 700;line-height: 120%;letter-spacing: -0.72px;text-transform: capitalize;`,
                        4: `font-size: 24px;font-weight: 700;line-height: 120%;letter-spacing: -0.72px;text-transform: capitalize;`,
                        5: `font-size: 24px;font-weight: 700;line-height: 120%;letter-spacing: -0.72px;text-transform: capitalize;`
                    }
                },
                'mobile': {
                    1: {
                        1: `font-size: 20px;font-weight: 700;line-height: 130%;letter-spacing: -0.4px;`
                    }
                }
            }
        },
        '16_9': {
            fontStyle: {
                'desktop': {
                    1: {
                        1: `font-size: 20px;font-weight: 700;line-height: 140%;letter-spacing: -0.96px;`,
                        2: `font-size: 24px;font-weight: 700;line-height: 140%;letter-spacing: -0.96px;`,
                        3: `font-size: 24px;font-weight: 700;line-height: 120%;letter-spacing: -0.72px;text-transform: capitalize;`,
                        4: `font-size: 24px;font-weight: 700;line-height: 140%;letter-spacing: -0.96px;`,
                        5: `font-size: 24px;font-weight: 700;line-height: 140%;letter-spacing: -0.96px;`
                    },
                    2: {
                        1: `font-size: 20px;font-weight: 700;line-height: 140%;letter-spacing: -0.96px;`,
                        2: `font-size: 24px;font-weight: 700;line-height: 140%;letter-spacing: -0.96px;`,
                        3: `font-size: 24px;font-weight: 700;line-height: 120%;letter-spacing: -0.72px;text-transform: capitalize;`,
                        4: `font-size: 24px;font-weight: 700;line-height: 140%;letter-spacing: -0.96px;`,
                        5: `font-size: 24px;font-weight: 700;line-height: 140%;letter-spacing: -0.96px;`
                    }
                },
                'mobile': {
                    1: { 1: `font-size: 24px;font-weight: 700;line-height: 120%;letter-spacing: -0.72px;` }
                }
            }
        },
    },
    'SWIPER': {
        'DEFAULT': {
            fontStyle: {
                'desktop': {
                    1: {
                        1: `font-size: 17px;font-style: normal;font-weight: 600;line-height: 130%;`,
                        2: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`,
                        3: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`,
                        4: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`,
                        5: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`
                    },
                    2: {
                        1: `font-size: 24px;font-weight: 800;line-height: 120%;letter-spacing: -0.96px;`,
                        2: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`,
                        3: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`,
                        4: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`,
                        5: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`
                    }
                },
                'mobile': {
                    1: { 1: `font-size: 16px;font-weight: 500;line-height: 130%;letter-spacing: -0.32px;` }
                }
            }
        },
        'FLIP': {
            fontStyle: {
                'desktop': {
                    1: {
                        1: `font-size: 24px;font-weight: 700;line-height: 130%;letter-spacing: -0.72px;`,
                        2: `font-size: 20px;font-weight: 700;line-height: 120%;letter-spacing: -0.4px;height:fit-content`,
                        3: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`,
                        4: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`,
                        5: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`
                    },
                    2: {
                        1: `font-size: 24px;font-weight: 700;line-height: 130%;letter-spacing: -0.72px;`,
                        2: `font-size: 20px;font-weight: 700;line-height: 120%;letter-spacing: -0.4px;height:fit-content`,
                        3: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`,
                        4: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`,
                        5: `font-size: 17px;font-weight: 600;line-height: 130%;font-size: 17px;font-weight: 500;line-height: 130%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`
                    }
                },
                'mobile': {
                    1: { 1: `font-size: 16px;font-weight: 500;line-height: 130%;letter-spacing: -0.32px;` }
                }
            }
        },
        'BIG': {
            fontStyle: {
                'desktop': {
                    1: {
                        1: `font-size: 28px;font-weight: 900;line-height: 130%;letter-spacing: -1.12px;`,
                        2: `font-size: 28px;font-weight: 900;line-height: 130%;letter-spacing: -1.12px;`,
                        3: `font-size: 28px;font-weight: 900;line-height: 130%;letter-spacing: -1.12px;`,
                        4: `font-size: 28px;font-weight: 900;line-height: 130%;letter-spacing: -1.12px;`,
                        5: `font-size: 28px;font-weight: 900;line-height: 130%;letter-spacing: -1.12px;`
                    },
                    2: {
                        1: `font-size: 28px;font-weight: 900;line-height: 130%;letter-spacing: -1.12px;`,
                        2: `font-size: 28px;font-weight: 900;line-height: 130%;letter-spacing: -1.12px;`,
                        3: `font-size: 28px;font-weight: 900;line-height: 130%;letter-spacing: -1.12px;`,
                        4: `font-size: 28px;font-weight: 900;line-height: 130%;letter-spacing: -1.12px;`,
                        5: `font-size: 28px;font-weight: 900;line-height: 130%;letter-spacing: -1.12px;`
                    }
                },
                'mobile': {
                    1: { 1: `font-size: 24px;font-weight: 700;line-height: 120%;letter-spacing: -0.72px;` }
                }
            }
        },
        'MEDIUM': {
            fontStyle: {
                'desktop': {
                    1: {
                        1: `font-size: 24px;font-weight: 700;line-height: 130%;letter-spacing: -0.72px;height:fit-content`,
                        2: `font-size: 24px;font-weight: 700;line-height: 130%;letter-spacing: -0.72px;height:fit-content`,
                        3: `font-size: 24px;font-weight: 700;line-height: 120%;letter-spacing: -0.72px;text-transform: capitalize;height:fit-content`,
                        4: `font-size: 24px;font-weight: 700;line-height: 130%;letter-spacing: -0.72px;height:fit-content`,
                        5: `font-size: 18px;font-weight: 500;line-height: 135%;letter-spacing: -0.36px;`
                    },
                    2: {
                        1: `font-size: 24px;font-weight: 700;line-height: 130%;letter-spacing: -0.72px;height:fit-content`,
                        2: `font-size: 20px;font-weight: 800;line-height: 120%;letter-spacing: -0.8px;height:fit-content`,
                        3: `font-size: 24px;font-weight: 700;line-height: 130%;letter-spacing: -0.72px;height:fit-content`,
                        4: `font-size: 24px;font-weight: 700;line-height: 130%;letter-spacing: -0.72px;height:fit-content`,
                        5: `font-size: 18px;font-weight: 500;line-height: 135%;letter-spacing: -0.36px;`
                    }
                },
                'mobile': {
                    1: {
                        1: `font-size: 24px;font-weight: 700;line-height: 130%;letter-spacing: -0.48px;`
                    }
                }
            }
        },
        'NOIMAGE': {
            fontStyle: {
                'desktop': {
                    1: {
                        1: `font-size: 22px;font-weight: 700;line-height: 135%;letter-spacing: -0.66px;height:fit-content`,
                        2: `font-size: 22px;font-weight: 700;line-height: 135%;letter-spacing: -0.66px;height:fit-content`,
                        3: `font-size: 22px;font-weight: 700;line-height: 135%;letter-spacing: -0.66px;height:fit-content`,
                        4: `font-size: 22px;font-weight: 700;line-height: 135%;letter-spacing: -0.66px;height:fit-content`,
                        5: `font-size: 22px;font-weight: 700;line-height: 135%;letter-spacing: -0.66px;height:fit-content`
                    },
                    2: {
                        1: `font-size: 22px;font-weight: 700;line-height: 135%;letter-spacing: -0.66px;height:fit-content`,
                        2: `font-size: 22px;font-weight: 700;line-height: 135%;letter-spacing: -0.66px;height:fit-content`,
                        3: `font-size: 22px;font-weight: 700;line-height: 135%;letter-spacing: -0.66px;height:fit-content`,
                        4: `font-size: 22px;font-weight: 700;line-height: 135%;letter-spacing: -0.66px;height:fit-content`,
                        5: `font-size: 22px;font-weight: 700;line-height: 135%;letter-spacing: -0.66px;height:fit-content`
                    }
                },
                'mobile': {
                    1: { 1: `font-size: 16px;font-weight: 500;line-height: 130%;letter-spacing: -0.32px;` }
                }
            }
        },
        '3_4': {
            fontStyle: {
                'desktop': {
                    1: {
                        1: `font-size: 18px;font-weight: 600;line-height: 130%;`,
                        2: `font-size: 18px;font-weight: 600;line-height: 130%;`,
                        3: `font-size: 18px;font-weight: 600;line-height: 130%;`,
                        4: `font-size: 18px;font-weight: 600;line-height: 130%;`,
                        5: `font-size: 18px;font-weight: 600;line-height: 130%;`
                    },
                    2: {
                        1: `font-size: 18px;font-weight: 600;line-height: 130%;`,
                        2: `font-size: 18px;font-weight: 600;line-height: 130%;`,
                        3: `font-size: 18px;font-weight: 600;line-height: 130%;`,
                        4: `font-size: 18px;font-weight: 600;line-height: 130%;`,
                        5: `font-size: 18px;font-weight: 600;line-height: 130%;`
                    }
                },
                'mobile': {
                    1: { 1: `font-size: 16px;font-weight: 500;line-height: 130%;letter-spacing: -0.32px;` }
                }
            }
        },
        '4_3': {
            fontStyle: {
                'desktop': {
                    1: {
                        1: `font-size: 24px;font-weight: 800;line-height: 120%;letter-spacing: -0.72px;`,
                        2: `font-size: 24px;font-weight: 700;line-height: 120%;letter-spacing: -0.72px;text-transform: capitalize;`,
                        3: `font-size: 24px;font-weight: 700;line-height: 120%; /* 28.8px */letter-spacing: -0.72px;text-transform: capitalize;`,
                        4: `font-size: 24px;font-weight: 700;line-height: 120%;letter-spacing: -0.72px;text-transform: capitalize;`,
                        5: `font-size: 24px;font-weight: 700;line-height: 120%;letter-spacing: -0.72px;text-transform: capitalize;`
                    },
                    2: {
                        1: `font-size: 18px;font-weight: 600;line-height: 120%;letter-spacing: -0.72px;`,
                        2: `font-size: 24px;font-weight: 700;line-height: 120%;letter-spacing: -0.72px;text-transform: capitalize;`,
                        3: `font-size: 18px;font-weight: 600;line-height: 130%;`,
                        4: `font-size: 24px;font-weight: 700;line-height: 120%;letter-spacing: -0.72px;text-transform: capitalize;`,
                        5: `font-size: 24px;font-weight: 700;line-height: 120%;letter-spacing: -0.72px;text-transform: capitalize;`
                    }
                },
                'mobile': {
                    1: { 1: `font-size: 20px;font-weight: 700;line-height: 130%;letter-spacing: -0.4px;` }
                }
            }
        },
        '16_9': {
            fontStyle: {
                'desktop': {
                    1: {
                        1: `font-size: 20px;font-weight: 700;line-height: 140%;letter-spacing: -0.96px;`,
                        2: `font-size: 24px;font-weight: 700;line-height: 140%;letter-spacing: -0.96px;`,
                        3: `font-size: 24px;font-weight: 700;line-height: 120%;letter-spacing: -0.72px;text-transform: capitalize;`,
                        4: `font-size: 18px;font-weight: 700;line-height: 135%;`,
                        5: `font-size: 24px;font-weight: 700;line-height: 140%;letter-spacing: -0.96px;`
                    },
                    2: {
                        1: `font-size: 20px;font-weight: 700;line-height: 140%;letter-spacing: -0.96px;`,
                        2: `font-size: 20px;font-weight: 800;line-height: 120%;letter-spacing: -0.8px;`,
                        3: `font-size: 24px;font-weight: 800;line-height: 120%;letter-spacing: -0.72px;text-transform: capitalize;`,
                        4: `font-size: 24px;font-weight: 700;line-height: 140%;letter-spacing: -0.96px;`,
                        5: `font-size: 24px;font-weight: 700;line-height: 140%;letter-spacing: -0.96px;`
                    }
                },
                'mobile': {
                    1: { 1: `font-size: 24px;font-weight: 700;line-height: 120%;letter-spacing:-0.96px;` }
                }
            }
        },
        '1_1': {
            fontStyle: {
                'desktop': {
                    1: {
                        1: `font-size: 20px;font-weight: 700;line-height: 140%;letter-spacing: -0.96px;`,
                        2: `font-size: 24px;font-weight: 700;line-height: 140%;letter-spacing: -0.96px;`,
                        3: `font-size: 24px;font-weight: 700;line-height: 140%;letter-spacing: -0.96px;text-transform: capitalize;`,
                        4: `font-size: 24px;font-weight: 900;line-height: 120%;letter-spacing: -0.96px;`,
                        5: `font-size: 24px;font-weight: 700;line-height: 140%;letter-spacing: -0.96px;`
                    },
                    2: {
                        1: `font-size: 20px;font-weight: 700;line-height: 140%;letter-spacing: -0.96px;`,
                        2: `font-size: 24px;font-weight: 700;line-height: 140%;letter-spacing: -0.96px;`,
                        3: `font-size: 24px;font-weight: 700;line-height: 120%;letter-spacing: -0.72px;text-transform: capitalize;`,
                        4: `font-size: 24px;font-weight: 700;line-height: 140%;letter-spacing: -0.96px;`,
                        5: `font-size: 24px;font-weight: 700;line-height: 140%;letter-spacing: -0.96px;`
                    }
                },
                'mobile': {
                    1: {
                        1: `font-size: 24px;font-weight: 700;line-height: 120%;letter-spacing: -0.8px;text-transform: capitalize;`
                    }
                }
            }
        },
    },
    'STORY_CARD_LISTING': {
        '3_4': {
            fontStyle: {
                'desktop': {
                    1: {
                        1: `font-size: 18px;font-weight: 600;line-height: 130%;`,
                        2: `font-size: 18px;font-weight: 600;line-height: 130%;`,
                        3: `font-size: 18px;font-weight: 600;line-height: 130%;`,
                        4: `font-size: 18px;font-weight: 600;line-height: 130%;`,
                        5: `font-size: 18px;font-weight: 600;line-height: 130%;`
                    },
                    2: {
                        1: `font-size: 18px;font-weight: 600;line-height: 130%;`,
                        2: `font-size: 18px;font-weight: 600;line-height: 130%;`,
                        3: `font-size: 18px;font-weight: 600;line-height: 130%;`,
                        4: `font-size: 18px;font-weight: 600;line-height: 130%;`,
                        5: `font-size: 18px;font-weight: 600;line-height: 130%;`
                    }
                },
                'mobile': {
                    1: { 1: `font-size: 16px;font-weight: 500;line-height: 130%;letter-spacing: -0.32px;` }
                }
            }
        },
        '4_3': {
            fontStyle: {
                'desktop': {
                    1: {
                        1: `font-size: 24px;font-weight: 800;line-height: 120%;letter-spacing: -0.72px;`,
                        2: `font-size: 24px;font-weight: 700;line-height: 120%;letter-spacing: -0.72px;text-transform: capitalize;`,
                        3: `font-size: 24px;font-weight: 700;line-height: 120%; /* 28.8px */letter-spacing: -0.72px;text-transform: capitalize;`,
                        4: `font-size: 24px;font-weight: 700;line-height: 120%;letter-spacing: -0.72px;text-transform: capitalize;`,
                        5: `font-size: 24px;font-weight: 700;line-height: 120%;letter-spacing: -0.72px;text-transform: capitalize;`
                    },
                    2: {
                        1: `font-size: 18px;font-weight: 600;line-height: 120%;letter-spacing: -0.72px;`,
                        2: `font-size: 24px;font-weight: 700;line-height: 120%;letter-spacing: -0.72px;text-transform: capitalize;`,
                        3: `font-size: 18px;font-weight: 600;line-height: 130%;`,
                        4: `font-size: 24px;font-weight: 700;line-height: 120%;letter-spacing: -0.72px;text-transform: capitalize;`,
                        5: `font-size: 24px;font-weight: 700;line-height: 120%;letter-spacing: -0.72px;text-transform: capitalize;`
                    }
                },
                'mobile': {
                    1: { 1: `font-size: 20px;font-weight: 700;line-height: 130%;letter-spacing: -0.4px;` }
                }
            }
        },
    },
    'STORY_CARD_LISTING_IN_PICTURE': {
        '9_16': {
            fontStyle: {
                'desktop': {
                    1: {
                        1: `font-size: 20px;font-weight: 700;line-height: 140%;letter-spacing: -0.96px;`,
                        2: `font-size: 24px;font-weight: 700;line-height: 140%;letter-spacing: -0.96px;`,
                        3: `font-size: 24px;font-weight: 800;line-height: 120%;letter-spacing: -0.72px;text-transform: capitalize;`,
                        4: `font-size: 24px;font-weight: 700;line-height: 140%;letter-spacing: -0.96px;`,
                        5: `font-size: 24px;font-weight: 700;line-height: 140%;letter-spacing: -0.96px;`
                    },
                    2: {
                        1: `font-size: 20px;font-weight: 700;line-height: 140%;letter-spacing: -0.96px;`,
                        2: `font-size: 20px;font-weight: 800;line-height: 120%;letter-spacing: -0.8px;`,
                        3: `font-size: 24px;font-weight: 800;line-height: 120%;letter-spacing: -0.72px;text-transform: capitalize;`,
                        4: `font-size: 24px;font-weight: 900;line-height: 120%; /* 28.8px */letter-spacing: -0.96px;`,
                        5: `font-size: 24px;font-weight: 700;line-height: 140%;letter-spacing: -0.96px;`
                    }
                },
                'mobile': {
                    1: { 1: `font-size: 20px;font-weight: 700;line-height: 130%;letter-spacing: -0.4px;` }
                }
            }
        },
    }
}

export const STYLE_PROPERTIES_HINDI = {
    'STORY_CARD': {
        'DEFAULT': {
            fontStyle: {
                'desktop': {
                    1: {
                        1: `font-size: 18px;font-weight: 600;line-height: 160%;`,
                        2: `font-size: 17px;font-weight: 600;line-height: 152%;font-size: 17px;font-weight: 500;line-height: 152%;letter-spacing: 0;height:fit-content`,
                        3: `font-size: 17px;font-weight: 600;line-height: 152%;font-size: 17px;font-weight: 500;line-height: 152%;letter-spacing: 0;height:fit-content`,
                        4: `font-size: 17px;font-weight: 600;line-height: 152%;font-size: 17px;font-weight: 500;line-height: 152%;letter-spacing: 0;height:fit-content`,
                        5: `font-size: 17px;font-weight: 600;line-height: 152%;font-size: 17px;font-weight: 500;line-height: 152%;letter-spacing: 0;height:fit-content`
                    },
                    2: {
                        1: `font-size: 18px;font-weight: 600;line-height: 160%;`,
                        2: `font-size: 18px;font-weight: 600;line-height: 160%;`,
                        3: `font-size: 17px;font-weight: 600;line-height: 152%;font-size: 17px;font-weight: 500;line-height: 152%;letter-spacing: 0;height:fit-content`,
                        4: `font-size: 17px;font-weight: 600;line-height: 152%;font-size: 17px;font-weight: 500;line-height: 152%;letter-spacing: 0;height:fit-content`,
                        5: `font-size: 17px;font-weight: 600;line-height: 152%;font-size: 17px;font-weight: 500;line-height: 152%;letter-spacing: 0;height:fit-content`
                    }
                },
                'mobile': {
                    1: {
                        1: `font-size: 16px;font-weight: 600;line-height: 160%;letter-spacing: 0;`
                    }
                }
            }
        },
        'EQUALDEFAULT': {
            fontStyle: {
                'desktop': {
                    1: {
                        1: `font-size: 18px;font-weight: 600;line-height: 152%;`,
                        2: `font-size: 17px;font-weight: 600;line-height: 152%;font-size: 17px;font-weight: 500;line-height: 152%;letter-spacing: 0;height:fit-content`,
                        3: `font-size: 17px;font-weight: 600;line-height: 152%;font-size: 17px;font-weight: 500;line-height: 152%;letter-spacing: 0;height:fit-content`,
                        4: `font-size: 17px;font-weight: 600;line-height: 152%;font-size: 17px;font-weight: 500;line-height: 152%;letter-spacing: 0;height:fit-content`,
                        5: `font-size: 17px;font-weight: 600;line-height: 152%;font-size: 17px;font-weight: 500;line-height: 152%;letter-spacing: 0;height:fit-content`
                    },
                    2: {
                        1: `font-size: 18px;font-weight: 600;line-height: 152%;`,
                        2: `font-size: 18px;font-weight: 600;line-height: 160%;`,
                        3: `font-size: 17px;font-weight: 600;line-height: 152%;font-size: 17px;font-weight: 500;line-height: 152%;letter-spacing: 0;height:fit-content`,
                        4: `font-size: 17px;font-weight: 600;line-height: 152%;font-size: 17px;font-weight: 500;line-height: 152%;letter-spacing: 0;height:fit-content`,
                        5: `font-size: 17px;font-weight: 600;line-height: 152%;font-size: 17px;font-weight: 500;line-height: 152%;letter-spacing: 0;height:fit-content`
                    }
                },
                'mobile': {
                    1: {
                        1: `font-size: 16px;font-weight: 600;line-height: 160%;letter-spacing: 0;`
                    }
                }
            }
        },
        'FLIP': {
            fontStyle: {
                'desktop': {
                    1: {
                        1: `font-size: 17px;font-weight: 500;line-height: 160%;text-transform: capitalize;`,
                        2: `font-size: 20px;font-weight: 700;line-height: 152%;letter-spacing: -0.4px;height:fit-content`,
                        3: `font-size: 17px;font-weight: 600;line-height: 152%;font-size: 17px;font-weight: 500;line-height: 152%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`,
                        4: `font-size: 17px;font-weight: 600;line-height: 152%;font-size: 17px;font-weight: 500;line-height: 152%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`,
                        5: `font-size: 17px;font-weight: 600;line-height: 152%;font-size: 17px;font-weight: 500;line-height: 152%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`
                    },
                    2: {
                        1: `font-size: 18px;font-weight: 600;line-height: 156%;letter-spacing: 0;`,
                        2: `font-size: 20px;font-weight: 700;line-height: 152%;letter-spacing: 0;height:fit-content`,
                        3: `font-size: 17px;font-weight: 600;line-height: 152%;font-size: 17px;font-weight: 500;line-height: 152%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`,
                        4: `font-size: 17px;font-weight: 600;line-height: 152%;font-size: 17px;font-weight: 500;line-height: 152%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`,
                        5: `font-size: 17px;font-weight: 600;line-height: 152%;font-size: 17px;font-weight: 500;line-height: 152%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`
                    }
                },
                'mobile': {
                    1: {
                        1: `font-size: 16px;font-weight: 600;line-height: 160%;letter-spacing: 0;`
                    }
                }
            }
        },
        'BIG': {
            fontStyle: {
                'desktop': {
                    1: {
                        1: `font-size: 24px;font-weight: 800;line-height: 155%;letter-spacing: 0;`,
                        2: `font-size: 28px;font-weight: 900;line-height: 152%;letter-spacing: 0;`,
                        3: `font-size: 28px;font-weight: 900;line-height: 152%;letter-spacing: 0;`,
                        4: `font-size: 28px;font-weight: 900;line-height: 152%;letter-spacing: 0;`,
                        5: `font-size: 28px;font-weight: 900;line-height: 152%;letter-spacing: 0;`
                    },
                    2: {
                        1: `font-size: 28px;font-weight: 700;line-height: 152%;letter-spacing: 0;`,
                        2: `font-size: 28px;font-weight: 700;line-height: 152%;letter-spacing: 0;`,
                        3: `font-size: 28px;font-weight: 700;line-height: 152%;letter-spacing: 0;`,
                        4: `font-size: 28px;font-weight: 700;line-height: 152%;letter-spacing: 0;`,
                        5: `font-size: 28px;font-weight: 700;line-height: 152%;letter-spacing: 0;`
                    }
                },
                'mobile': {
                    1: {
                        1: `font-size: 24px;font-weight: 900;line-height: 155%;letter-spacing: 0;`
                    }
                }
            }
        },
        'MEDIUM': {
            fontStyle: {
                'desktop': {
                    1: {
                        1: `font-size: 18px;font-weight: 700;line-height: 156%;letter-spacing: 0;`,
                        2: `font-size: 24px;font-weight: 700;line-height: 152%;letter-spacing: -0.72px;height:fit-content`,
                        3: `font-size: 24px;font-weight: 800;line-height: 152%;letter-spacing: -0.96px;height:fit-content`,
                        4: `font-size: 24px;font-weight: 700;line-height: 152%;letter-spacing: -0.72px;height:fit-content`,
                        5: `font-size: 18px;font-weight: 500;line-height: 152%;letter-spacing: -0.36px;`
                    },
                    2: {
                        1: `font-size: 24px;font-weight: 700;line-height: 152%;letter-spacing: -0.72px;height:fit-content`,
                        2: `font-size: 24px;font-weight: 700;line-height: 152%;letter-spacing: -0.72px;height:fit-content`,
                        3: `font-size: 24px;font-weight: 700;line-height: 152%;letter-spacing: -0.72px;height:fit-content`,
                        4: `font-size: 24px;font-weight: 700;line-height: 152%;letter-spacing: -0.72px;height:fit-content`,
                        5: `font-size: 18px;font-weight: 500;line-height: 152%;letter-spacing: -0.36px;`
                    }
                },
                'mobile': {
                    1: {
                        1: `font-size: 20px;font-weight: 700;line-height: 155%;letter-spacing: 0;`
                    }
                }
            }
        },
        'NOIMAGE': {
            fontStyle: {
                'desktop': {
                    1: {
                        1: `font-size: 17px;font-weight: 600;line-height: 160%;height:fit-content`,
                        2: `font-size: 22px;font-weight: 700;line-height: 160%;letter-spacing: 0;height:fit-content`,
                        3: `font-size: 22px;font-weight: 700;line-height: 160%;letter-spacing: 0;height:fit-content`,
                        4: `font-size: 22px;font-weight: 700;line-height: 160%;letter-spacing: 0;height:fit-content`,
                        5: `font-size: 22px;font-weight: 700;line-height: 160%;letter-spacing: 0;height:fit-content`
                    },
                    2: {
                        1: `font-size: 22px;font-weight: 700;line-height: 160%;letter-spacing: 0;height:fit-content`,
                        2: `font-size: 22px;font-weight: 700;line-height: 160%;letter-spacing: 0;height:fit-content`,
                        3: `font-size: 22px;font-weight: 700;line-height: 160%;letter-spacing: 0;height:fit-content`,
                        4: `font-size: 22px;font-weight: 700;line-height: 160%;letter-spacing: 0;height:fit-content`,
                        5: `font-size: 22px;font-weight: 700;line-height: 160%;letter-spacing: 0;height:fit-content`
                    }
                },
                'mobile': {
                    1: {
                        1: `font-size: 16px;font-weight: 600;line-height: 160%;letter-spacing: 0;`
                    }
                }
            }
        },
        '3_4': {
            fontStyle: {
                'desktop': {
                    1: {
                        1: `font-size: 18px;font-weight: 600;line-height: 152%;`,
                        2: `font-size: 18px;font-weight: 600;line-height: 152%;`,
                        3: `font-size: 18px;font-weight: 600;line-height: 152%;`,
                        4: `font-size: 18px;font-weight: 600;line-height: 152%;`,
                        5: `font-size: 18px;font-weight: 600;line-height: 152%;`
                    },
                    2: {
                        1: `font-size: 18px;font-weight: 600;line-height: 152%;`,
                        2: `font-size: 18px;font-weight: 600;line-height: 152%;`,
                        3: `font-size: 18px;font-weight: 600;line-height: 152%;`,
                        4: `font-size: 18px;font-weight: 600;line-height: 152%;`,
                        5: `font-size: 18px;font-weight: 600;line-height: 152%;`
                    }
                },
                'mobile': {
                    1: {
                        1: `font-size: 16px;font-weight: 500;line-height: 152%;letter-spacing: 0;`
                    }
                }
            }
        },
        '4_3': {
            fontStyle: {
                'desktop': {
                    1: {
                        1: `font-size: 18px;font-weight: 600;line-height: 152%;letter-spacing: -0.72px;`,
                        2: `font-size: 24px;font-weight: 700;line-height: 152%;letter-spacing: -0.72px;text-transform: capitalize;`,
                        3: `font-size: 24px;font-weight: 700;line-height: 152%;letter-spacing: -0.72px;text-transform: capitalize;`,
                        4: `font-size: 24px;font-weight: 700;line-height: 152%;letter-spacing: -0.72px;text-transform: capitalize;`,
                        5: `font-size: 24px;font-weight: 700;line-height: 152%;letter-spacing: -0.72px;text-transform: capitalize;`
                    },
                    2: {
                        1: `font-size: 18px;font-weight: 600;line-height: 152%;letter-spacing: -0.72px;`,
                        2: `font-size: 24px;font-weight: 700;line-height: 152%;letter-spacing: -0.72px;text-transform: capitalize;`,
                        3: `font-size: 24px;font-weight: 700;line-height: 152%;letter-spacing: -0.72px;text-transform: capitalize;`,
                        4: `font-size: 24px;font-weight: 700;line-height: 152%;letter-spacing: -0.72px;text-transform: capitalize;`,
                        5: `font-size: 24px;font-weight: 700;line-height: 152%;letter-spacing: -0.72px;text-transform: capitalize;`
                    }
                },
                'mobile': {
                    1: {
                        1: `font-size: 20px;font-weight: 700;line-height: 152%;letter-spacing: 0;`
                    }
                }
            }
        },
        '16_9': {
            fontStyle: {
                'desktop': {
                    1: {
                        1: `font-size: 20px;font-weight: 700;line-height: 152%;letter-spacing: -0.96px;`,
                        2: `font-size: 24px;font-weight: 700;line-height: 152%;letter-spacing: -0.96px;`,
                        3: `font-size: 24px;font-weight: 700;line-height: 152%;letter-spacing: -0.72px;text-transform: capitalize;`,
                        4: `font-size: 24px;font-weight: 700;line-height: 152%;letter-spacing: -0.96px;`,
                        5: `font-size: 24px;font-weight: 700;line-height: 152%;letter-spacing: -0.96px;`
                    },
                    2: {
                        1: `font-size: 20px;font-weight: 700;line-height: 152%;letter-spacing: -0.96px;`,
                        2: `font-size: 24px;font-weight: 700;line-height: 152%;letter-spacing: -0.96px;`,
                        3: `font-size: 24px;font-weight: 700;line-height: 152%;letter-spacing: -0.72px;text-transform: capitalize;`,
                        4: `font-size: 24px;font-weight: 700;line-height: 152%;letter-spacing: -0.96px;`,
                        5: `font-size: 24px;font-weight: 700;line-height: 152%;letter-spacing: -0.96px;`
                    }
                },
                'mobile': {
                    1: { 1: `font-size: 24px;font-weight: 700;line-height: 155%;letter-spacing: 0;` }
                }
            }
        },
    },
    'SWIPER': {
        'DEFAULT': {
            fontStyle: {
                'desktop': {
                    1: {
                        1: `font-size: 17px;font-style: normal;font-weight: 600;line-height: 130%;`,
                        2: `font-size: 17px;font-weight: 600;line-height: 152%;font-size: 17px;font-weight: 500;line-height: 152%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`,
                        3: `font-size: 17px;font-weight: 600;line-height: 152%;font-size: 17px;font-weight: 500;line-height: 152%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`,
                        4: `font-size: 17px;font-weight: 600;line-height: 152%;font-size: 17px;font-weight: 500;line-height: 152%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`,
                        5: `font-size: 17px;font-weight: 600;line-height: 152%;font-size: 17px;font-weight: 500;line-height: 152%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`
                    },
                    2: {
                        1: `font-size: 24px;font-weight: 700;line-height: 155%;letter-spacing: 0;`,
                        2: `font-size: 17px;font-weight: 600;line-height: 152%;font-size: 17px;font-weight: 500;line-height: 152%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`,
                        3: `font-size: 17px;font-weight: 600;line-height: 152%;font-size: 17px;font-weight: 500;line-height: 152%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`,
                        4: `font-size: 17px;font-weight: 600;line-height: 152%;font-size: 17px;font-weight: 500;line-height: 152%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`,
                        5: `font-size: 17px;font-weight: 600;line-height: 152%;font-size: 17px;font-weight: 500;line-height: 152%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`
                    }
                },
                'mobile': {
                    1: { 1: `font-size: 16px;font-weight: 500;line-height: 160%;letter-spacing: 0;` }
                }
            }
        },
        'FLIP': {
            fontStyle: {
                'desktop': {
                    1: {
                        1: `font-size: 24px;font-weight: 700;line-height: 152%;letter-spacing: -0.72px;`,
                        2: `font-size: 20px;font-weight: 700;line-height: 152%;letter-spacing: -0.4px;height:fit-content`,
                        3: `font-size: 17px;font-weight: 600;line-height: 152%;font-size: 17px;font-weight: 500;line-height: 152%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`,
                        4: `font-size: 17px;font-weight: 600;line-height: 152%;font-size: 17px;font-weight: 500;line-height: 152%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`,
                        5: `font-size: 17px;font-weight: 600;line-height: 152%;font-size: 17px;font-weight: 500;line-height: 152%;letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`
                    },
                    2: {
                        1: `font-size: 24px;font-weight: 700;line-height: 152%letter-spacing: -0.72px;`,
                        2: `font-size: 20px;font-weight: 700;line-height: 152%;letter-spacing: -0.4px;height:fit-content`,
                        3: `font-size: 17px;font-weight: 600;line-height: 152%font-size: 17px;font-weight: 500;line-height: 152%letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`,
                        4: `font-size: 17px;font-weight: 600;line-height: 152%font-size: 17px;font-weight: 500;line-height: 152%letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`,
                        5: `font-size: 17px;font-weight: 600;line-height: 152%font-size: 17px;font-weight: 500;line-height: 152%letter-spacing: -0.34px;letter-spacing: -0.34px;height:fit-content`
                    }
                },
                'mobile': {
                    1: { 1: `font-size: 16px;font-weight: 500;line-height: 160%;letter-spacing: 0;` }
                }
            }
        },
        'BIG': {
            fontStyle: {
                'desktop': {
                    1: {
                        1: `font-size: 28px;font-weight: 900;line-height: 152%;letter-spacing: -1.12px;`,
                        2: `font-size: 28px;font-weight: 900;line-height: 152%;letter-spacing: -1.12px;`,
                        3: `font-size: 28px;font-weight: 900;line-height: 152%;letter-spacing: -1.12px;`,
                        4: `font-size: 28px;font-weight: 900;line-height: 152%;letter-spacing: -1.12px;`,
                        5: `font-size: 28px;font-weight: 900;line-height: 152%;letter-spacing: -1.12px;`
                    },
                    2: {
                        1: `font-size: 28px;font-weight: 900;line-height: 152%;letter-spacing: -1.12px;`,
                        2: `font-size: 28px;font-weight: 900;line-height: 152%;letter-spacing: -1.12px;`,
                        3: `font-size: 28px;font-weight: 900;line-height: 152%;letter-spacing: -1.12px;`,
                        4: `font-size: 28px;font-weight: 900;line-height: 152%;letter-spacing: -1.12px;`,
                        5: `font-size: 28px;font-weight: 900;line-height: 152%;letter-spacing: -1.12px;`
                    }
                },
                'mobile': {
                    1: { 1: `font-size: 24px;font-weight: 700;line-height: 155%;letter-spacing: 0;` }
                }
            }
        },
        'MEDIUM': {
            fontStyle: {
                'desktop': {
                    1: {
                        1: `font-size: 24px;font-weight: 700;line-height: 152%;letter-spacing: -0.72px;height:fit-content`,
                        2: `font-size: 24px;font-weight: 700;line-height: 152%;letter-spacing: -0.72px;height:fit-content`,
                        3: `font-size: 24px;font-weight: 700;line-height: 152%;letter-spacing: -0.72px;text-transform: capitalize;height:fit-content`,
                        4: `font-size: 24px;font-weight: 700;line-height: 152%;letter-spacing: -0.72px;height:fit-content`,
                        5: `font-size: 18px;font-weight: 500;line-height: 152%;letter-spacing: -0.36px;`
                    },
                    2: {
                        1: `font-size: 24px;font-weight: 700;line-height: 152%;letter-spacing: -0.72px;height:fit-content`,
                        2: `font-size: 20px;font-weight: 800;line-height: 152%;letter-spacing: 0;height:fit-content`,
                        3: `font-size: 24px;font-weight: 700;line-height: 152%;letter-spacing: -0.72px;height:fit-content`,
                        4: `font-size: 24px;font-weight: 700;line-height: 152%;letter-spacing: -0.72px;height:fit-content`,
                        5: `font-size: 18px;font-weight: 500;line-height: 152%;letter-spacing: -0.36px;`
                    }
                },
                'mobile': {
                    1: {
                        1: `font-size: 24px;font-weight: 700;line-height: 155%;letter-spacing: 0;`
                    }
                }
            }
        },
        'NOIMAGE': {
            fontStyle: {
                'desktop': {
                    1: {
                        1: `font-size: 22px;font-weight: 700;line-height: 152%;letter-spacing: -0.66px;height:fit-content`,
                        2: `font-size: 22px;font-weight: 700;line-height: 152%;letter-spacing: -0.66px;height:fit-content`,
                        3: `font-size: 22px;font-weight: 700;line-height: 152%;letter-spacing: -0.66px;height:fit-content`,
                        4: `font-size: 22px;font-weight: 700;line-height: 152%;letter-spacing: -0.66px;height:fit-content`,
                        5: `font-size: 22px;font-weight: 700;line-height: 152%;letter-spacing: -0.66px;height:fit-content`
                    },
                    2: {
                        1: `font-size: 22px;font-weight: 700;line-height: 152%;letter-spacing: -0.66px;height:fit-content`,
                        2: `font-size: 22px;font-weight: 700;line-height: 152%;letter-spacing: -0.66px;height:fit-content`,
                        3: `font-size: 22px;font-weight: 700;line-height: 152%;letter-spacing: -0.66px;height:fit-content`,
                        4: `font-size: 22px;font-weight: 700;line-height: 152%;letter-spacing: -0.66px;height:fit-content`,
                        5: `font-size: 22px;font-weight: 700;line-height: 152%;letter-spacing: -0.66px;height:fit-content`
                    }
                },
                'mobile': {
                    1: { 1: `font-size: 16px;font-weight: 500;line-height: 155%;letter-spacing: 0;` }
                }
            }
        },
        '3_4': {
            fontStyle: {
                'desktop': {
                    1: {
                        1: `font-size: 18px;font-weight: 600;line-height: 152%;letter-spacing:0;`,
                        2: `font-size: 18px;font-weight: 600;line-height: 152%;letter-spacing:0;`,
                        3: `font-size: 18px;font-weight: 600;line-height: 152%;letter-spacing:0;`,
                        4: `font-size: 18px;font-weight: 600;line-height: 152%;letter-spacing:0;`,
                        5: `font-size: 18px;font-weight: 600;line-height: 156%;letter-spacing:0;`
                    },
                    2: {
                        1: `font-size: 18px;font-weight: 600;line-height: 152%;letter-spacing:0;`,
                        2: `font-size: 18px;font-weight: 600;line-height: 152%;letter-spacing:0;`,
                        3: `font-size: 18px;font-weight: 600;line-height: 152%;letter-spacing:0;`,
                        4: `font-size: 18px;font-weight: 600;line-height: 152%;letter-spacing:0;`,
                        5: `font-size: 18px;font-weight: 600;line-height: 156%;letter-spacing:0;`
                    }
                },
                'mobile': {
                    1: { 1: `font-size: 16px;font-weight: 500;line-height: 152%;letter-spacing: 0;` }
                }
            }
        },
        '4_3': {
            fontStyle: {
                'desktop': {
                    1: {
                        1: `font-size: 24px;font-weight: 800;line-height: 152%;letter-spacing:0;`,
                        2: `font-size: 24px;font-weight: 700;line-height: 152%;letter-spacing:0;text-transform: capitalize;`,
                        3: `font-size: 24px;font-weight: 700;line-height: 152%; /* 28.8px */letter-spacing:0;text-transform: capitalize;`,
                        4: `font-size: 24px;font-weight: 700;line-height: 152%;letter-spacing:0;text-transform: capitalize;`,
                        5: `font-size: 24px;font-weight: 700;line-height: 152%;letter-spacing:0;text-transform: capitalize;`
                    },
                    2: {
                        1: `font-size: 18px;font-weight: 600;line-height: 152%;letter-spacing:0;`,
                        2: `font-size: 24px;font-weight: 700;line-height: 152%;letter-spacing:0;text-transform: capitalize;`,
                        3: `font-size: 18px;font-weight: 700;line-height: 156%;letter-spacing:0;margin-bottom:0;`,
                        4: `font-size: 24px;font-weight: 700;line-height: 152%;letter-spacing:0;text-transform: capitalize;`,
                        5: `font-size: 24px;font-weight: 700;line-height: 152%;letter-spacing:0;text-transform: capitalize;`
                    }
                },
                'mobile': {
                    1: { 1: `font-size: 20px;font-weight: 700;line-height: 152%;letter-spacing: 0;` }
                }
            }
        },
        '16_9': {
            fontStyle: {
                'desktop': {
                    1: {
                        1: `font-size: 20px;font-weight: 700;line-height: 155%;letter-spacing: 0;`,
                        2: `font-size: 24px;font-weight: 700;line-height: 155%;letter-spacing: 0;`,
                        3: `font-size: 24px;font-weight: 700;line-height: 155%;letter-spacing: 0;text-transform: capitalize;`,
                        4: `font-size: 18px;font-weight: 700;line-height: 155%;letter-spacing: 0;`,
                        5: `font-size: 24px;font-weight: 700;line-height: 155%;letter-spacing: 0;`
                    },
                    2: {
                        1: `font-size: 20px;font-weight: 700;line-height: 155%;letter-spacing: 0;`,
                        2: `font-size: 20px;font-weight: 800;line-height: 155%;letter-spacing: 0;`,
                        3: `font-size: 24px;font-weight: 800;line-height: 155%;letter-spacing: 0;text-transform: capitalize;`,
                        4: `font-size: 24px;font-weight: 700;line-height: 155%;letter-spacing: 0;`,
                        5: `font-size: 24px;font-weight: 700;line-height: 155%;letter-spacing: 0;`
                    }
                },
                'mobile': {
                    1: { 1: `font-size: 20px;font-weight: 700;line-height: 155%;letter-spacing: 0;` }
                }
            }
        },
        '1_1': {
            fontStyle: {
                'desktop': {
                    1: {
                        1: `font-size: 20px;font-weight: 700;line-height: 155%;letter-spacing: 0;`,
                        2: `font-size: 24px;font-weight: 700;line-height: 155%;letter-spacing: 0;`,
                        3: `font-size: 24px;font-weight: 700;line-height: 155%;letter-spacing: 0;text-transform: capitalize;`,
                        4: `font-size: 24px;font-weight: 800;line-height: 155%;letter-spacing: 0;`,
                        5: `font-size: 24px;font-weight: 700;line-height: 155%;letter-spacing: 0;`
                    },
                    2: {
                        1: `font-size: 20px;font-weight: 700;line-height: 155%;letter-spacing: 0;`,
                        2: `font-size: 24px;font-weight: 700;line-height: 155%;letter-spacing: 0;`,
                        3: `font-size: 24px;font-weight: 700;line-height: 155%;letter-spacing: 0;text-transform: capitalize;`,
                        4: `font-size: 24px;font-weight: 700;line-height: 155%;letter-spacing: 0;`,
                        5: `font-size: 24px;font-weight: 700;line-height: 155%;letter-spacing: 0;`
                    }
                },
                'mobile': {
                    1: {
                        1: `font-size: 20px;font-weight: 700;line-height: 155%;letter-spacing: 0;text-transform: capitalize;`
                    }
                }
            }
        },
    },
    'STORY_CARD_LISTING': {
        '3_4': {
            fontStyle: {
                'desktop': {
                    1: {
                        1: `font-size: 18px;font-weight: 600;line-height: 152%;letter-spacing: 0;`,
                        2: `font-size: 18px;font-weight: 600;line-height: 152%;letter-spacing: 0;`,
                        3: `font-size: 18px;font-weight: 600;line-height: 152%;letter-spacing: 0;`,
                        4: `font-size: 18px;font-weight: 600;line-height: 152%;letter-spacing: 0;`,
                        5: `font-size: 18px;font-weight: 600;line-height: 152%;letter-spacing: 0;`
                    },
                    2: {
                        1: `font-size: 18px;font-weight: 600;line-height: 152%;letter-spacing: 0;`,
                        2: `font-size: 18px;font-weight: 600;line-height: 152%;letter-spacing: 0;`,
                        3: `font-size: 18px;font-weight: 600;line-height: 152%;letter-spacing: 0;`,
                        4: `font-size: 18px;font-weight: 600;line-height: 152%;letter-spacing: 0;`,
                        5: `font-size: 18px;font-weight: 600;line-height: 152%;letter-spacing: 0;`
                    }
                },
                'mobile': {
                    1: { 1: `font-size: 16px;font-weight: 500;line-height: 152%;letter-spacing: 0;` }
                }
            }
        },
        '4_3': {
            fontStyle: {
                'desktop': {
                    1: {
                        1: `font-size: 24px;font-weight: 800;line-height: 152%;letter-spacing: 0;`,
                        2: `font-size: 24px;font-weight: 700;line-height: 152%;letter-spacing: 0;text-transform: capitalize;`,
                        3: `font-size: 18px;font-weight: 800;line-height: 152%; /* 28.8px */letter-spacing: 0;text-transform: capitalize;`,
                        4: `font-size: 18px;font-weight: 800;line-height: 152%;letter-spacing: 0;text-transform: capitalize;`,
                        5: `font-size: 18px;font-weight: 800;line-height: 152%;letter-spacing: 0;text-transform: capitalize;`
                    },
                    2: {
                        1: `font-size: 18px;font-weight: 600;line-height: 152%;letter-spacing: 0;`,
                        2: `font-size: 24px;font-weight: 700;line-height: 152%;letter-spacing: 0;text-transform: capitalize;`,
                        3: `font-size: 18px;font-weight: 800;line-height: 152%;letter-spacing: 0;`,
                        4: `font-size: 24px;font-weight: 700;line-height: 152%;letter-spacing: 0;text-transform: capitalize;`,
                        5: `font-size: 24px;font-weight: 700;line-height: 152%;letter-spacing: 0;text-transform: capitalize;`
                    }
                },
                'mobile': {
                    1: { 1: `font-size: 20px;font-weight: 700;line-height: 152%;letter-spacing: 0;` }
                }
            }
        },
    },
    'STORY_CARD_LISTING_IN_PICTURE': {
        '9_16': {
            fontStyle: {
                'desktop': {
                    1: {
                        1: `font-size: 20px;font-weight: 700;line-height: 152%;letter-spacing: -0.96px;`,
                        2: `font-size: 24px;font-weight: 700;line-height: 152%;letter-spacing: -0.96px;`,
                        3: `font-size: 24px;font-weight: 800;line-height: 152%;letter-spacing: -0.72px;text-transform: capitalize;`,
                        4: `font-size: 24px;font-weight: 700;line-height: 152%;letter-spacing: -0.96px;`,
                        5: `font-size: 24px;font-weight: 700;line-height: 152%;letter-spacing: -0.96px;`
                    },
                    2: {
                        1: `font-size: 20px;font-weight: 700;line-height: 152%;letter-spacing: -0.96px;`,
                        2: `font-size: 20px;font-weight: 800;line-height: 152%;letter-spacing: -0.8px;`,
                        3: `font-size: 24px;font-weight: 800;line-height: 152%;letter-spacing: -0.72px;text-transform: capitalize;`,
                        4: `font-size: 24px;font-weight: 900;line-height: 152%; /* 28.8px */letter-spacing: -0.96px;`,
                        5: `font-size: 24px;font-weight: 700;line-height: 152%;letter-spacing: -0.96px;`
                    }
                },
                'mobile': {
                    1: { 1: `font-size: 20px;font-weight: 700;line-height: 152%;letter-spacing: 0;` }
                }
            }
        },
    },
    'SWIPER_IN_PICTURE': {
        '1_1': {
            fontStyle: {
                'desktop': {
                    1: {
                        1: 'font-size: 24px;font-weight: 800;line-height: 152%',
                        2: 'font-size: 24px;font-weight: 800;line-height: 152%',
                        3: 'font-size: 24px;font-weight: 800;line-height: 152%',
                        4: 'font-size: 24px;font-weight: 800;line-height: 152%',
                        5: 'font-size: 24px;font-weight: 800;line-height: 152%'
                    }
                }
            }
        }
    }
}
