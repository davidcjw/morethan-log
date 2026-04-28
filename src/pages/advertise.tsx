import styled from "@emotion/styled"
import MetaConfig from "src/components/MetaConfig"
import { NextPageWithLayout } from "src/types"
import { CONFIG } from "site.config"
import { FiArrowUpRight, FiMail } from "react-icons/fi"

type SponsorPackage = {
  id: string
  name: string
  price: string
  placement: string
  description: string
  href?: string
}

const packages = (CONFIG.ads?.packages || []) as SponsorPackage[]

const AdvertisePage: NextPageWithLayout = () => {
  const contactHref = `mailto:${CONFIG.profile.email}?subject=${encodeURIComponent(
    "Sponsor David's Smart Home Notes"
  )}`
  const meta = {
    title: "Advertise",
    description:
      "Sponsor David's Smart Home Notes with clearly labeled direct advertising placements.",
    type: "WebPage",
    url: `${CONFIG.link}/advertise`,
    jsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Advertise",
      description:
        "Sponsor David's Smart Home Notes with clearly labeled direct advertising placements.",
      url: `${CONFIG.link}/advertise`,
    },
  }

  return (
    <>
      <MetaConfig {...meta} />
      <StyledWrapper>
        <section className="intro">
          <span>Direct sponsorships</span>
          <h1>Advertise on David&apos;s Smart Home Notes</h1>
          <p>
            Reach readers who are comparing smart home devices, planning HDB
            installs, and building reliable Home Assistant setups.
          </p>
          <a className="contact" href={contactHref}>
            <FiMail aria-hidden="true" />
            Discuss a campaign
          </a>
        </section>

        <section className="packages" aria-label="Sponsorship packages">
          {packages.map((item) => {
            const href = item.href || contactHref
            const isExternal = /^https?:\/\//.test(href)

            return (
              <article key={item.id}>
                <span>{item.placement}</span>
                <h2>{item.name}</h2>
                <div className="price">{item.price}</div>
                <p>{item.description}</p>
                <a
                  href={href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                >
                  Reserve this slot
                  {isExternal && <FiArrowUpRight aria-hidden="true" />}
                </a>
              </article>
            )
          })}
        </section>

        <section className="notes">
          <h2>How it works</h2>
          <p>
            Every placement is manually reviewed before it appears on the site.
            Paid placements are always labeled as advertisements or sponsored
            content, and outbound sponsor links use the sponsored relationship
            attribute.
          </p>
        </section>
      </StyledWrapper>
    </>
  )
}

export default AdvertisePage

const StyledWrapper = styled.div`
  display: grid;
  gap: 2rem;
  margin: 0 auto;
  max-width: 56rem;
  min-width: 0;
  padding: 2rem 0 4rem;

  .intro {
    span {
      color: ${({ theme }) => theme.colors.blue11};
      font-size: 0.8125rem;
      line-height: 1.125rem;
      font-weight: 700;
      text-transform: uppercase;
    }

    h1 {
      margin-top: 0.75rem;
      max-width: 42rem;
      color: ${({ theme }) => theme.colors.gray12};
      font-size: 2rem;
      line-height: 2.5rem;
      font-weight: 850;
      letter-spacing: 0;
    }

    p {
      margin-top: 1rem;
      max-width: 40rem;
      color: ${({ theme }) => theme.colors.gray11};
      font-size: 1rem;
      line-height: 1.75rem;
    }

    .contact {
      display: inline-flex;
      gap: 0.5rem;
      align-items: center;
      margin-top: 1.5rem;
      border-radius: 0.5rem;
      padding: 0.75rem 1rem;
      background-color: ${({ theme }) => theme.colors.blue9};
      color: white;
      font-size: 0.9375rem;
      line-height: 1.25rem;
      font-weight: 800;

      :hover {
        background-color: ${({ theme }) => theme.colors.blue10};
      }
    }
  }

  .packages {
    display: grid;
    gap: 1rem;

    @media (min-width: 768px) {
      grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    article {
      border: 1px solid ${({ theme }) => theme.colors.gray6};
      border-radius: 0.5rem;
      padding: 1.25rem;
      background-color: ${({ theme }) =>
        theme.scheme === "light" ? "white" : theme.colors.gray3};

      :hover {
        border-color: ${({ theme }) => theme.colors.gray7};
      }

      > span {
        color: ${({ theme }) => theme.colors.gray10};
        font-size: 0.75rem;
        line-height: 1rem;
      }

      h2 {
        margin-top: 0.5rem;
        color: ${({ theme }) => theme.colors.gray12};
        font-size: 1.125rem;
        line-height: 1.5rem;
        font-weight: 800;
      }

      .price {
        margin-top: 0.75rem;
        color: ${({ theme }) => theme.colors.blue11};
        font-size: 0.9375rem;
        line-height: 1.25rem;
        font-weight: 700;
      }

      p {
        margin-top: 0.75rem;
        min-height: 5rem;
        color: ${({ theme }) => theme.colors.gray11};
        font-size: 0.875rem;
        line-height: 1.5rem;
      }

      a {
        display: inline-flex;
        gap: 0.375rem;
        align-items: center;
        margin-top: 1rem;
        color: ${({ theme }) => theme.colors.blue11};
        font-size: 0.875rem;
        line-height: 1.25rem;
        font-weight: 700;
      }
    }
  }

  .notes {
    border-top: 1px solid ${({ theme }) => theme.colors.gray6};
    padding-top: 2rem;

    h2 {
      color: ${({ theme }) => theme.colors.gray12};
      font-size: 1.25rem;
      line-height: 1.75rem;
      font-weight: 850;
    }

    p {
      margin-top: 0.75rem;
      color: ${({ theme }) => theme.colors.gray11};
      font-size: 0.9375rem;
      line-height: 1.625rem;
    }
  }
`
