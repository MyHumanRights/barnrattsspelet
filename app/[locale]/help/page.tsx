import { Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslator, unstable_setRequestLocale } from 'next-intl/server'
import { LocaleParams } from '@/utils/types'
import { Footer } from '../components/Footer'
import { PageHeader } from '../components/PageHeader'
import { HomeIcon } from '../components/Icons/HomeIcon'
import styles from './Help.module.scss'

export async function generateMetadata({
  params: { locale },
}: LocaleParams): Promise<Metadata> {
  const t = await getTranslator(locale, 'meta')

  return {
    title: t('title.help'),
    description: t('description.help'),
  }
}

const Help = ({ params: { locale } }: LocaleParams) => {
  unstable_setRequestLocale(locale)
  const t = useTranslations()

  return (
    <>
      <div className={styles.help}>
        <PageHeader
          buttonText={t('mainmenu.home')}
          buttonHref='/home'
          buttonIcon={<HomeIcon />}
          heading={t('help.heading')}
        />
        <main className={styles.wrapper}>
          <p className={styles.preamble}>{t('help.preamble')}</p>
          <div className={styles.articleWrapper}>
            <article>
              <h2 id='general-advise' className={styles.linkTarget}>
                {t('help.subheading1')}
              </h2>
              <p>{t('help.paragraph1')}</p>

              <h3>{t('help.subheading2')}</h3>
              <p>
                <em>{t('help.paragraph2')}</em>
              </p>

              <h3>{t('help.subheading3')}</h3>
              <p>{t('help.paragraph3')}</p>
              <ul>
                <li>
                  <a
                    href='https://www.bris.se/for-barn-och-unga/just-nu/'
                    target='_blank'
                    rel='noreferrer'
                  >
                    {t('help.link1')}
                  </a>
                  <p>
                    {t('help.paragraph4.part1')}
                    <a href='tel:116 111'>116 111</a>
                    {t('help.paragraph4.part2')}
                  </p>
                </li>

                <li>
                  <a
                    href='https://rkuf.se/vad-vi-gor/jourhavande-kompis/'
                    target='_blank'
                    rel='noreferrer'
                  >
                    {t('help.link2')}
                  </a>
                  <p>{t('help.paragraph5')}</p>
                </li>

                <li>
                  <a
                    href='https://www.tryggabarnen.org/om-chatten'
                    target='_blank'
                    rel='noreferrer'
                  >
                    {t('help.link3')}
                  </a>
                  <p>{t('help.paragraph6')}</p>
                </li>

                <li>
                  <a
                    href='https://maskrosbarn.org/vara-aktiviteter/chatta-med-oss/'
                    target='_blank'
                    rel='noreferrer'
                  >
                    {t('help.link4')}
                  </a>
                  <p>{t('help.paragraph7')}</p>
                </li>

                <li>
                  <a
                    href='https://barnrattsbyran.se/'
                    target='_blank'
                    rel='noreferrer'
                  >
                    {t('help.link5')}
                  </a>
                  <p>
                    {t('help.paragraph8')}
                    <a href='tel:08-15 02 22'>08-15 02 22</a>
                  </p>
                </li>
              </ul>
            </article>
            <div className={styles.backgroundsTop} />
          </div>
          <div className={styles.eye} />

          <div className={styles.articleWrapper}>
            <article>
              <h2 id='bullying-help' className={styles.linkTarget}>
                {t('help.subheading4')}
              </h2>
              <p>{t('help.paragraph9')}</p>
              <p>{t('help.paragraph10')}</p>

              <ul>
                <li>
                  <a
                    href='https://friends.se/radgivning/'
                    target='_blank'
                    rel='noreferrer'
                  >
                    {t('help.link6')}
                  </a>
                  <p>
                    {t('help.paragraph11.part1')}
                    <a href='tel:08-545 519 90'>08-545 519 90</a>
                    {t('help.paragraph11.part2')}
                    <a href='mailto:radgivning@friends.se'>
                      radgivning@friends.se
                    </a>
                  </p>
                </li>
              </ul>
            </article>
          </div>
          <div className={styles.backgroundsHands} />

          <div className={styles.articleWrapper}>
            <article>
              <h2 id='repression-advise' className={styles.linkTarget}>
                {t('help.subheading5')}
              </h2>
              <p>{t('help.paragraph12')}</p>
              <p>{t('help.paragraph13')}</p>
              <ul>
                <li>
                  <a
                    href='https://www.raddabarnen.se/rad-och-kunskap/karleken-ar-fri/om-heder-for-dig-som-ung/hit-kan-du-vanda-dig/'
                    target='_blank'
                    rel='noreferrer'
                  >
                    {t('help.link7')}
                  </a>
                  <p>{t('help.paragraph14')}</p>
                </li>
              </ul>

              <h3>{t('help.subheading2')}</h3>
              <p>
                <em>{t('help.paragraph15')}</em>
              </p>
            </article>
          </div>

          <div className={styles.articleWrapper}>
            <article>
              <h2 id='sexual-abuse-advise' className={styles.linkTarget}>
                {t('help.subheading6')}
              </h2>
              <p>{t('help.paragraph16')}</p>
              <p>{t('help.paragraph17')}</p>

              <ul>
                <li>
                  <a
                    href='https://dittecpat.se/'
                    target='_blank'
                    rel='noreferrer'
                  >
                    {t('help.link8')}
                  </a>
                  <p>{t('help.paragraph18')}</p>
                </li>
                <li>
                  <a
                    href='https://polisen.se/delbart'
                    target='_blank'
                    rel='noreferrer'
                  >
                    {t('help.link9')}
                  </a>
                  <p>{t('help.paragraph19')}</p>
                </li>
              </ul>

              <h3>{t('help.subheading2')}</h3>
              <p>
                <em>{t('help.paragraph20')}</em>
              </p>
            </article>
            <div className={styles.backgroundsFlower} />
          </div>

          <div className={styles.backgroundsGlobe} />

          <div className={styles.articleWrapper}>
            <article>
              <h2 id='refugee-advise' className={styles.linkTarget}>
                {t('help.subheading7')}
              </h2>
              <p>{t('help.paragraph21')}</p>
              <p>{t('help.paragraph22')}</p>

              <ul>
                <li>
                  <a
                    href='https://sweref.org/barnens-asylrattscentrum/'
                    target='_blank'
                    rel='noreferrer'
                  >
                    {t('help.link10')}
                  </a>
                  <p>
                    {t('help.paragraph23.part1')}
                    <a href='tel:0200-75 17 03'>0200-75 17 03</a>
                    {t('help.paragraph23.part2')}
                    <a href='mailto:barn@sweref.org'>barn@sweref.org</a>
                  </p>
                </li>
                <li>
                  <a
                    href='https://asylbyran.se/'
                    target='_blank'
                    rel='noreferrer'
                  >
                    {t('help.link11')}
                  </a>
                  <p>
                    {t('help.paragraph24')}
                    <a href='tel:08-50 00 75 39'>08-50 00 75 39</a>.
                  </p>
                </li>
              </ul>
            </article>
          </div>

          <article>
            <div className={styles.contactListText}>
              <h2 id='discriminated-advise' className={styles.linkTarget}>
                {t('help.subheading8')}
              </h2>
              <p>{t('help.paragraph25')}</p>
              <p>{t('help.paragraph26')}</p>
            </div>
            <div className={styles.contactList}>
              <ul>
                <li>
                  <p>
                    <strong>{t('help.paragraph27')}</strong>
                    <br />
                    {t('help.phone')}
                    <a href='tel:0920-25 99 85'>0920-25 99 85</a>
                    <br />
                    {t('help.email')}
                    <a href='mailto:rattighetscentrum.norrbotten@sensus.se'>
                      rattighetscentrum.norrbotten@sensus.se
                    </a>
                  </p>
                </li>

                <li>
                  <p>
                    <strong>{t('help.paragraph28')}</strong>
                    <br />
                    {t('help.phone')}
                    <a href='tel:090-14 37 66'>090-14 37 66</a>
                    <br />
                    {t('help.email')}
                    <a href='mailto:rattighetscentrum.norrbotten@sensus.se'>
                      rattighetscentrum.norrbotten@sensus.se
                    </a>
                  </p>
                </li>

                <li>
                  <p>
                    <strong>{t('help.paragraph29')}</strong>
                    <br />
                    {t('help.phone')}
                    <a href='tel:0704-97 78 04'>0704-97 78 04</a>
                    <br />
                    {t('help.email')}
                    <a href='mailto:rattighetscentrum.dalarna@sensus.se'>
                      rattighetscentrum.dalarna@sensus.se
                    </a>
                  </p>
                </li>

                <li>
                  <p>
                    <strong>{t('help.paragraph30')}</strong>
                    <br />
                    {t('help.email')}
                    <a href='mailto:info.diskrimineringsbyran@gmail.com'>
                      info.diskrimineringsbyran@gmail.com
                    </a>
                  </p>
                </li>

                <li>
                  <p>
                    <strong>{t('help.paragraph31')}</strong>
                    <br />
                    {t('help.phone')}
                    <a href='tel:0707-88 59 31'>0707-88 59 31</a>
                    <br />
                    {t('help.email')}
                    <a href='mailto:diskriminering@bfciv.se'>
                      diskriminering@bfciv.se
                    </a>
                  </p>
                </li>

                <li>
                  <p>
                    <strong>{t('help.paragraph32')}</strong>
                    <br />
                    {t('help.phone')}
                    <a href='tel:018-66 19 50'>018-66 19 50</a>
                    <br />
                    {t('help.email')}
                    <a href='mailto:adu@sensus.se'>adu@sensus.se</a>
                  </p>
                </li>

                <li>
                  <p>
                    <strong>{t('help.paragraph33')}</strong>
                    <br />
                    {t('help.phone')}
                    <a href='tel:072-083 54 24'>072-083 54 24</a>
                    <br />
                    {t('help.email')}
                    <a href='mailto:kontakt@antidiskrimineringsstockholm.se'>
                      kontakt@antidiskrimineringsstockholm.se
                    </a>
                  </p>
                </li>

                <li>
                  <p>
                    <strong>{t('help.paragraph34')}</strong>
                    <br />
                    {t('help.phone')}
                    <a href='tel:08-531 911 10'>08-531 911 10</a>
                    <br />
                    {t('help.email')}
                    <a href='mailto:syd@adb-stockholm.org'>
                      syd@adb-stockholm.org
                    </a>
                  </p>
                </li>

                <li>
                  <p>
                    <strong>{t('help.paragraph35')}</strong>
                    <br />
                    {t('help.phone')}
                    <a href='tel:016-13 23 25'>016-13 23 25</a>
                    <br />
                    {t('help.email')}
                    <a href='mailto:info@humanitas.se'>info@humanitas.se</a>
                  </p>
                </li>

                <li>
                  <p>
                    <strong>{t('help.paragraph36')}</strong>
                    <br />
                    {t('help.phone')}
                    <a href='tel:019-18 40 18'>019-18 40 18</a>
                    <br />
                    {t('help.email')}
                    <a href='mailto:info@rattighetscenter.se'>
                      info@rattighetscenter.se
                    </a>
                  </p>
                </li>

                <li>
                  <p>
                    <strong>{t('help.paragraph37')}</strong>
                    <br />
                    {t('help.phone')}
                    <a href='tel:011-10 71 31'>011-10 71 31</a>
                    <br />
                    {t('help.email')}
                    <a href='mailto:info@diskriminering.se'>
                      info@diskriminering.se
                    </a>
                  </p>
                </li>

                <li>
                  <p>
                    <strong>{t('help.paragraph38')}</strong>
                    <br />
                    {t('help.phone')}
                    <a href='tel:0520-834 53'>0520-834 53</a>
                  </p>
                </li>

                <li>
                  <p>
                    <strong>{t('help.paragraph39')}</strong>
                    <br />
                    {t('help.phone')}
                    <a href='tel:073-856 44 00'>073-856 44 00</a>
                    <br />
                    {t('help.email')}
                    <a href='mailto:radgivning@gbgrc.se'>radgivning@gbgrc.se</a>
                  </p>
                </li>

                <li>
                  <p>
                    <strong>{t('help.paragraph40')}</strong>
                    <br />
                    {t('help.phone')}
                    <a href='tel:073-314 33 26'>073-314 33 26</a>
                    <br />
                    {t('help.email')}
                    <a href='mailto:info@adbsydost.se'>info@adbsydost.se</a>
                  </p>
                </li>

                <li>
                  <p>
                    <strong>{t('help.paragraph41')}</strong>
                    <br />
                    {t('help.phone')}
                    <a href='tel:042-28 48 45'>042-28 48 45</a>
                    <br />
                    {t('help.email')}
                    <a href='mailto:info@adbhelsingborg.se'>
                      info@adbhelsingborg.se
                    </a>
                  </p>
                </li>

                <li>
                  <p>
                    <strong>{t('help.paragraph42')}</strong>
                    <br />
                    {t('help.phone')}
                    <a href='tel:040-636 51 40'>040-636 51 40</a>
                    <br />
                    {t('help.email')}
                    <a href='mailto:info@malmomotdiskriminering.se'>
                      info@malmomotdiskriminering.se
                    </a>
                  </p>
                </li>
              </ul>
              <div className={styles.backgroundsChatBubbles} />
            </div>
          </article>
        </main>
        <Footer />
      </div>
    </>
  )
}

export default Help
