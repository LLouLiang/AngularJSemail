using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RepositoryCtrl
{
	class Program
	{
		static void Main(string[] args)
		{
			shape s = new circle();
			shape sh = new shape();
			circle c = new circle();
			square sq = new square();
			c.draw();
			sq.draw();
			s.draw();
			abc a = new abc();
			abc b = new abc();
			IShape shape= (IShape)a;
			IPerson person = (IPerson)a;
			//todo(shape);
			//todo(person);
			shape.getName();
			person.getName();
			a.getName();
			Console.WriteLine(a.Equals(b));
			Console.ReadLine();
		}

		public void todo(IShape iss)
		{
			iss.getName();
		}
	}
	public interface IShape
	{
		 void getName();
	}
	public interface IPerson
	{
		void getName();
	}
	class abc : IShape,IPerson
	{
		public void getName()
		{
			Console.WriteLine("called from abc class");
			Console.ReadLine();
		}
		void IShape.getName()
		{
			Console.WriteLine("called from Shape class");
			Console.ReadLine();
		}
		void IPerson.getName()
		{
			Console.WriteLine("called from person class");
			Console.ReadLine();
		}
	}
	class shape
	{
		public virtual void draw()
		{
			Console.WriteLine("this is base class shape");
			Console.ReadLine();
		}
		public virtual void todo()
		{
			Console.WriteLine("this is base class shape");
			Console.ReadLine();
		}
	}
	class circle : shape
	{
		public override void draw()
		{
			base.draw();
		}
		public void todo()
		{
			Console.WriteLine("this is derived class circle");
			Console.ReadLine();
		}
	}
	class square : circle
	{
		public override void draw()
		{
			base.draw();
		}
	}
}

