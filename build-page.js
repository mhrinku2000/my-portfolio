const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf-8');

const heroStart = html.indexOf('<!-- Hero Section -->');
const portfolioStart = html.indexOf('<!-- Portfolio Section -->');
const statsStart = html.indexOf('<!-- Stats Section -->');
const footerStart = html.indexOf('<!-- Footer -->');

let heroAndServices = html.substring(heroStart, portfolioStart);
let statsAndContact = html.substring(statsStart, footerStart);

function jsxify(content) {
  content = content.replace(/class="/g, 'className="');
  content = content.replace(/tabindex="/g, 'tabIndex="');
  content = content.replace(/for="/g, 'htmlFor="');
  content = content.replace(/viewBox="/g, 'viewBox="');
  content = content.replace(/fill-rule="/g, 'fillRule="');
  content = content.replace(/clip-rule="/g, 'clipRule="');
  content = content.replace(/<!--(.*?)-->/g, '{/*$1*/}');
  content = content.replace(/<img([^>]*)>/g, '<img$1 />');
  content = content.replace(/<input([^>]*)>/g, '<input$1 />');
  content = content.replace(/<br>/g, '<br />');
  content = content.replace(/<hr>/g, '<hr />');
  return content;
}

const finalJsx = `import Link from "next/link";
import connectMongo from "@/lib/mongodb";
import Project from "@/models/Project";
import ProjectGrid from "../components/ProjectGrid";

export const dynamic = 'force-dynamic';

export default async function Home() {
  await connectMongo();
  let projects = await Project.find({}).sort({ createdAt: -1 });
  projects = JSON.parse(JSON.stringify(projects));

  return (
    <>
      ${jsxify(heroAndServices)}

      {/* Portfolio Section */}
      <section className="py-24" id="portfolio">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div>
              <h2 className="text-primary font-bold tracking-widest uppercase text-sm mb-3">Portfolio</h2>
              <h3 className="text-4xl md:text-5xl font-black text-white">Featured Projects</h3>
            </div>
          </div>
          <ProjectGrid initialProjects={projects} />
        </div>
      </section>

      ${jsxify(statsAndContact)}
    </>
  );
}
`;

fs.writeFileSync('app/(main)/page.js', finalJsx);
console.log('Successfully generated dynamic page.js');
